<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('shop_id');
            $table->enum('service_type', ['UberEats', 'foodpanda', 'didi'])->comment('参照先テーブル名');
            $table->string('status')->comment('ステータス');
            $table->string('brand_name')->comment('店舗名');
            $table->string('name')->comment('氏名');
            $table->unsignedInteger('fee')->comment('その他手数料');
            $table->unsignedInteger('total')->comment('小計');
            $table->string('order_number')->comment('注文番号');
            $table->string('expedition_type')->comment('提供方法');
            $table->string('phone')->comment('電話番号');
            $table->boolean('is_disposable')->comment('使い捨て容器');
            $table->text('comment')->comment('注文に関するご要望');
            $table->dateTime('ordered_at')->comment('お渡し・お届け時間');
            $table->dateTime('delivered_at')->nullable('注文日時');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('orders');
    }
}
