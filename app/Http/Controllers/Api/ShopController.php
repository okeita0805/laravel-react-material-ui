<?php

namespace App\Http\Controllers\Api;

use App\Eloquent\Shop;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class ShopController extends Controller
{
    public function index(): JsonResponse
    {
        $shop_id = Auth::user()->shop_id;
        $shop = Shop::query()->where('id', $shop_id)->first();

        return response()->json(
            [
                'shop' => [
                    'name' => $shop->name,
                    'address' => $shop->address,
                    'email' => $shop->email,
                ],
            ],
            200
        );
    }
}
