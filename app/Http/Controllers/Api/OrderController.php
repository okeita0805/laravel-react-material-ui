<?php

namespace App\Http\Controllers\Api;

use App\Eloquent\Order;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
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
}
