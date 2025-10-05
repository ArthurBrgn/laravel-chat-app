<?php

declare(strict_types=1);

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth'])->group(function () {
    Route::get('/', [DashboardController::class, 'home'])->name('home');
    Route::get('/conversations/{conversation}', [DashboardController::class, 'conversation'])->name('conversation');
});

require __DIR__.'/auth.php';
