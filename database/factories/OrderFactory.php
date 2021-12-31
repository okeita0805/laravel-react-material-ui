<?php

use App\Eloquent\Order;
use App\Model;
use Carbon\Carbon;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

/** @var Factory $factory */
$factory->define(Order::class, function (Faker $faker) {
    $date = Carbon::now();
    return [
        'shop_id' => 1,
        'service_type' => 'foodpanda',
        'status' => '完了',
        'brand_name' => 'ブランド1',
        'name' => 'order name',
        'fee' => 100,
        'total' => 30000,
        'order_number' => 'AME 4DF',
        'expedition_type' => '配達代行',
        'phone' => '080 9999 3333',
        'is_disposable' => true,
        'comment' => 'なるだけ早く配達をお願いします',
        'ordered_at' => $date,
        'delivered_at' => $date,
        'created_at' => $date,
        'updated_at' => $date,
    ];
});
