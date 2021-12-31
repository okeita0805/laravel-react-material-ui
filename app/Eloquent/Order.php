<?php

namespace App\Eloquent;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    /**
     * @return HasMany
     */
    public function uberEatsDetails(): HasMany
    {
        return $this->hasMany(OrderUberEatsDetail::class);
    }

    /**
     * @return HasMany
     */
    public function foodpandDetails(): HasMany
    {
        return $this->hasMany(OrderDetailFoodpanda::class);
    }

    /**
     * @return HasMany
     */
    public function details(): HasMany
    {
        return $this->hasMany(OrderDetail::class);
    }
}
