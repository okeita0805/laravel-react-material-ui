<?php

namespace App\Manager\Webhook;

use App\Dto\Webhook\FoodpandaInput;
use App\Eloquent\Brand;
use App\Eloquent\Order;
use App\Eloquent\OrderDetail;
use App\Eloquent\OrderFoodpandaDetail;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\DB;

use function Symfony\Component\String\s;

class FoodpandaManager
{
    /**
     * @param FoodpandaInput $input
     * @throws Exception
     */
    public function saveOrder(FoodpandaInput $input): void
    {
        $brand = Brand::where('foodpanda_store_id', $input->foodpanda_store_id)->first();

        DB::beginTransaction();
        try {
            $order = Order::create($this->createOrder($input, $brand));
            OrderFoodpandaDetail::query()->create($this->createOrderPandaDetail($input, $order));
            OrderDetail::query()->insert($this->createOrderDetails($input, $order));
            DB::commit();
        } catch (\Throwable $e) {
            DB::rollBack();
            throw new Exception($e);
        }
    }

    /**
     * @param FoodpandaInput $input
     * @param Brand $brand
     * @return array
     */
    private function createOrder(FoodpandaInput $input, Brand $brand): array
    {
        return [
            'shop_id' => $brand->shop_id,
            'service_type' => $input->service_type,
            'status' => $input->status,
            'brand_name' => $brand->name,
            'name' => $input->name,
            'fee' => $input->fee,
            'discount' => $input->discount,
            'total' => $input->total,
            'order_number' => $input->order_number,
            'expedition_type' => $input->expedition_type,
            'phone' => $input->phone,
            'address' => $input->address,
            'is_disposable' => $input->is_disposable,
            'comment' => $input->comment,
            'ordered_at' => $input->ordered_at,
        ];
    }

    /**
     * @param FoodpandaInput $input
     * @param Order $order
     * @return array
     */
    private function createOrderDetails(FoodpandaInput $input, Order $order): array
    {
        $now = Carbon::now();
        $order_details = [];
        foreach ($input->order_details as $order_detail) {
            $order_detail['order_id'] = $order->id;
            $order_detail['created_at'] = $now;
            $order_detail['updated_at'] = $now;
            $order_details[] = $order_detail;
        }
        return $order_details;
    }

    /**
     * @param FoodpandaInput $input
     * @param Order $order
     * @return array
     */
    private function createOrderPandaDetail(FoodpandaInput $input, Order $order): array
    {
        $latest = OrderFoodpandaDetail::query()->orderBy('id', 'desc')->first();
        $delivery_number = is_null($latest) ? 1 : $latest->delivery_number + 1;
        return [
            'order_id' => $order->id,
            'payment_method' => $input->payment_method,
            'delivery_number' => $delivery_number,
            'foodpanda_order_id' => $input->foodpanda_order_id,
        ];
    }
}
