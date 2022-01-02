<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFoodpandaOrderIdToOrderFoodpandaDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('order_foodpanda_details', function (Blueprint $table) {
            $table->string('foodpanda_order_id')->unique()->after('delivery_number')->comment('webhooks/foodpandaに送られるデータのorder_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('order_foodpanda_details', function (Blueprint $table) {
            $table->dropColumn('foodpanda_order_id');
        });
    }
}
