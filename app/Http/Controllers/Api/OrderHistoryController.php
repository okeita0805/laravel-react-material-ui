<?php

namespace App\Http\Controllers\Api;

use App\Eloquent\Order;
use App\Eloquent\OrderFoodpandaDetail;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class OrderHistoryController extends Controller
{
    /**
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $shop_id = Auth::user()->shop_id;
        $orders = Order::query()->where('shop_id', $shop_id)->orderBy('id', 'desc')->get();

        $response = $orders->map(function(Order $order) {
                return [
                    'id' => $order->id,
                    'status' => $order->status,
                    'orderNumber' => $order->order_number,
                    'total' => $order->total,
                    'brandName' => $order->brand_name,
                    'orderedAt' => $order->ordered_at,
                ];
        });

        return response()->json([
            'orderHistories' => $response
        ], 200);
    }

    /**
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id): JsonResponse
    {
        $shop_id = Auth::user()->shop_id;
        $order = Order::query()->with('details')->where('shop_id', $shop_id)->where('id', $id)->first();
        if (is_null($order)) {
            return response()->json([], 404);
        }

        $service = $order->service_type;
        if ($service === 'foodpanda') {
            $order_with_service = OrderFoodpandaDetail::query()->where('order_id', $order->id)->first();
            return response()->json(
                [
                    'orderHistoryDetail' => [
                        'orderNumber' => $order->order_number,
                        'expeditionType' => $order->expedition_type,
                        'serviceType' => $order->service_type,
                        'name' => $order->name,
                        'address' => 'addressを後で入れる',
                        'phone' => $order->phone,
                        'paymentMethod' => $order_with_service->payment_method,
                        'orderedAt' => $order->ordered_at,
                        'deliveredAt' => $order->delivered_at,
                        'isDisposable' => $order->is_disposable,
                        'deliveryNumber' => $order_with_service->delivery_number,
                        'order' => $order->comment,
                    ],
                ],
                200
            );
        }
    }
}
