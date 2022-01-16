<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::group([
    'namespace' => 'Api',
    'middleware' => ['auth']
 ], function () {
    Route::get('/brands','BrandController@index');
    Route::put('/brands','BrandController@update');

    // 店舗情報を1件取得
    Route::get('/shops','ShopController@index');

    // プリンター情報を1件取得
    Route::get('/printers','PrinterController@index');
    Route::put('/printers','PrinterController@update');

    // 売上管理
    Route::get('/order_histories','OrderHistoryController@index');
    Route::get('/order_histories/{id}','OrderHistoryController@show');

    // 売上集計
    Route::get('/order_reports','OrderReportController@index');

    // 注文状況
    Route::get('/orders','OrderController@index');
    Route::get('/orders/order_stops','OrderController@getOrderStops');

});
