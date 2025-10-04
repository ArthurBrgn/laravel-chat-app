<?php

declare(strict_types=1);

namespace App\Enums;

enum ReactionType: string
{
    case PRIVATE = 'PRIVATE';
    case GROUP = 'GROUP';
}
