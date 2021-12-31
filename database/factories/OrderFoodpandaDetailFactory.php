<?php

use App\Eloquent\OrderFoodpandaDetail;
use Carbon\Carbon;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

/** @var Factory $factory */
$factory->define(OrderFoodpandaDetail::class, function (Faker $faker) {
    $date = Carbon::now();
    return [
        'payment_method' => 'クレジットカード',
        'delivery_number' => 1, // お渡し番号
        'created_at' => $date,
        'updated_at' => $date,
    ];
});
