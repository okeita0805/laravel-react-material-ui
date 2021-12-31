<?php

use App\Eloquent\Order;
use App\Eloquent\OrderDetail;
use App\Eloquent\OrderDetailModifier;
use App\Eloquent\OrderFoodpandaDetail;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Foodpandaの注文を1件作成
     *
     * @return void
     */
    public function run()
    {
        $order = factory(Order::class)->create();
        factory(OrderFoodpandaDetail::class)->create(
            [
                'order_id' => $order->id,
            ]
        );

        $order_detail = factory(OrderDetail::class)->create(
            [
                'order_id' => $order->id,
            ]
        );

        factory(OrderDetailModifier::class)->create(
            [
                'order_detail_id' => $order_detail->id,
            ]
        );
    }
}
