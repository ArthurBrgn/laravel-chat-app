<?php

declare(strict_types=1);

namespace App\Models;

use App\Enums\ReactionType;
use Illuminate\Database\Eloquent\Model;

final class Reaction extends Model
{
    protected $casts = [
        'type' => ReactionType::class,
    ];
}
