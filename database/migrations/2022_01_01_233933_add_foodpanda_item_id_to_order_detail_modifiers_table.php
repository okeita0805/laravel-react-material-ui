<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFoodpandaItemIdToOrderDetailModifiersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('order_detail_modifiers', function (Blueprint $table) {
            $table->string('foodpanda_item_id')->nullable()->after('quantity');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('order_detail_modifiers', function (Blueprint $table) {
            $table->dropColumn('foodpanda_item_id');
        });
    }
}
