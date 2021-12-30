<?php

namespace App\Http\Controllers\Api;

use App\Eloquent\Printer;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PrinterController extends Controller
{
    public function index(): JsonResponse
    {
        $shop_id = Auth::user()->shop_id;
        $printer = Printer::query()->where('shop_id', $shop_id)->first();
        return response()->json(
            [
                'printer' => [
                    'id' => $printer->id,
                    'receiptWidth' => $printer->receipt_width,
                    'quantity' => $printer->quantity,
                ],
            ],
            200
        );
    }

    public function update(Request $request): JsonResponse
    {
        $shop_id = Auth::user()->shop_id;
        $printer = [
            'receipt_width' => $request->get('receiptWidth', '58mm'),
            'quantity' => $request->get('quantity', 1)
        ];
        Printer::query()->where('shop_id', $shop_id)->update($printer);

        return response()->json([], 200);
    }
}
