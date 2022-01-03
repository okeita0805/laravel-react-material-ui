<?php

namespace App\Eloquent;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderDetailModifier extends Model
{
    protected $guarded = [];

    public function detail(): BelongsTo
    {
        return $this->belongsTo(orderDetail::class);
    }
}
