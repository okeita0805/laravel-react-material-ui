<?php

namespace App\Http\Controllers\Api;

use App\Eloquent\Brand;
use App\Eloquent\Order;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    /**
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $shop_id = Auth::user()->shop_id;
        $statuses = [
            '新規注文',
            '調理中',
            '準備完了',
        ];
        $orders = Order::query()->where('shop_id', $shop_id)->whereIn('status', $statuses)->orderBy('id', 'desc')->get();

        return response()->json(
            [
                'orders' => $orders->map(function (Order $order) {
                    return [
                        'id' => $order->id,
                        'status' => $order->status,
                        'serviceType' => $order->service_type,
                        'orderNumber' => $order->order_number,
                        'brandName' => $order->brand_name,
                        'expeditionType' => $order->expedition_type,
                        'deliveredAt' => $order->delivered_at,
                    ];
                })
            ],
            200
        );
    }

    /**
     * 注文のステータスを更新
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id): JsonResponse
    {
        $status = $request->get('status', null);
        if (is_null($status)) {
            return response()->json([], 400);
        }

        $shop_id = Auth::user()->shop_id;
        $order = Order::query()->where('shop_id', $shop_id)->where('id', $id)->first();
        if (is_null($order)) {
            return response()->json([], 404);
        }

        $order->status = $status;
        $order->save();

        return response()->json([
            'order' => $order->toArray()
        ], 200);
    }

    /**
     * 注文受付停止のブランド返却
     * @return JsonResponse
     */
    public function getOrderStops(): JsonResponse
    {
        $shop_id = Auth::user()->shop_id;
        $brands = Brand::query()->where('shop_id', $shop_id)->orWhere('is_uber_eats_order_accepted', false)
            ->orWhere('is_foodpanda_order_accepted', false)
            ->orWhere('is_didi_order_accepted', false)->get();

        $is_order_stops = $brands->filter(function (Brand $brand) {
            // UberEatsを有効化、かつ注文受付を停止している場合
            if ($brand->is_uber_eats_usage && !$brand->is_uber_eats_order_accepted) {
                return true;
            }

            // Foodpandaを有効化、かつ注文受付を停止している状態
            if ($brand->is_foodpanda_usage && !$brand->is_foodpanda_order_accepted) {
                return true;
            }

            // Didiを有効化、かつ注文受付を停止している状態
            if ($brand->is_didi_usage && !$brand->is_didi_order_accepted) {
                return true;
            }
            return false;
        });

        return response()->json(['isOrderStops' => $is_order_stops->isNotEmpty()], 200);
    }
}
