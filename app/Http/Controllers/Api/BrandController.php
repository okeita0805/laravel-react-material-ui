<?php

namespace App\Http\Controllers\Api;

use App\Eloquent\Brand;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BrandController extends Controller
{
    public function index(): JsonResponse
    {
        $shop_id = Auth::user()->shop_id;
        $brands = Brand::query()->where('shop_id', $shop_id)->get()->map(function(Brand $brand) {
            return [
                'id' => $brand->id,
                'name' => $brand->name,
                'isUberEatsUsage' => $brand->is_uber_eats_usage,
                'isFoodpandaUsage' => $brand->is_foodpanda_usage,
                'isDidiUsage' => $brand->is_didi_usage,
                'isUberEatsOrderAccepted' => $brand->is_uber_eats_order_accepted,
                'isFoodpandaOrderAccepted' => $brand->is_foodpanda_order_accepted,
                'isDidiOrderAccepted' => $brand->is_didi_order_accepted,
            ];
        })->toArray();

        return response()->json(
            [
                'brands' => $brands,
            ],
            200
        );
    }

    public function update(Request $request): JsonResponse
    {
        $shop_id = Auth::user()->shop_id;
        $brand = [
            'id' => $request->get('id'),
            'is_uber_eats_order_accepted' => (bool)$request->get('isUberEatsOrderAccepted'),
            'is_foodpanda_order_accepted' => (bool)$request->get('isFoodpandaOrderAccepted'),
            'is_didi_order_accepted' => (bool)$request->get('isDidiOrderAccepted'),
        ];
        Brand::query()->where('shop_id', $shop_id)->where('id', $request->get('id'))->update($brand);
        return response()->json([],200);
    }
}
