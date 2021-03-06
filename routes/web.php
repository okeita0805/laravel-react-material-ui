<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::middleware(['auth'])->group(function () {

    $paths = ['/', '/order_stop', '/sales', '/sold_out', '/business_hours', '/holidays', '/settings'];
    foreach ($paths as $path) {
        Route::get($path, function () {
            return view('index');
        })->where('any', '.*');
    }
});

Route::post('/webhook/foodpanada', 'Webhook\FoodpandaController');

Auth::routes();
