<?php

use App\Eloquent\OrderDetailModifier;
use App\Model;
use Carbon\Carbon;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

/** @var Factory $factory */
$factory->define(OrderDetailModifier::class, function (Faker $faker) {
    $date = Carbon::now();
    return [
        'name' => 'menu 1',
        'price' => 100,
        'quantity' => 1,
        'created_at' => $date,
        'updated_at' => $date,
    ];
});
