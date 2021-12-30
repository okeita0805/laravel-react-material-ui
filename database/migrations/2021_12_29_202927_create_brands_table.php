<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBrandsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('brands', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('shop_id');
            $table->string('name');
            $table->boolean('is_uber_eats_usage')->default(false);
            $table->boolean('is_uber_eats_order_accepted')->default(false);
            $table->boolean('is_foodpanda_usage')->default(false);
            $table->boolean('is_foodpanda_order_accepted')->default(false);
            $table->boolean('is_didi_usage')->default(false);
            $table->boolean('is_didi_order_accepted')->default(false);

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
        Schema::dropIfExists('brands');
    }
}
