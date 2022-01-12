<?php

namespace App\Http\Controllers\Api;

use App\Eloquent\Brand;
use App\Eloquent\Order;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

class OrderReportController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function index(Request $request): JsonResponse
    {
        $shop_id = Auth::user()->shop_id;
        $date = Carbon::parse($request->get('startDate'));
        $service_type = $request->get('serviceType');

        $query = Order::query()->where('shop_id', $shop_id);
        if ($service_type !== '全て') {
            $query = $query->where('service_type', $service_type);
        }

        $order_reports = $query->whereDate('ordered_at', $date->format('Y-m-d'))->orderBy('id', 'desc')->get();
        return response()->json([
            'orderReport' => [
                'summary' => $this->createSummary($order_reports),
                'eachReport' => $order_reports->map(function(Order $order_report) {
                    return [
                        'id' => $order_report->id,
                        'status' => $order_report->status,
                        'orderedAt' => $order_report->ordered_at,
                        'orderNumber' => $order_report->order_number,
                        'total' => $order_report->total,
                        'brandName' => $order_report->brand_name,
                    ];
                })->toArray(),
            ],
        ], 200);
    }

    /**
     * @param Collection $order_reports
     * @return array
     */
    private function createSummary(Collection $order_reports): array
    {
        $summary = [];
        foreach ($order_reports as $order_report) {
            if (isset($summary[$order_report->brand_name])) {
                $summary[$order_report->brand_name]['orderQuantity']++;
                $summary[$order_report->brand_name]['total'] += $order_report->total;
                continue;
            }
            $summary[$order_report->brand_name] = [
                'brandName' => $order_report->brand_name,
                'serviceType' => $order_report->service_type,
                'orderQuantity' => 1,
                'total' => $order_report->total,
            ];
        }

        return array_values($summary);
    }
}
