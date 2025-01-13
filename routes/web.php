<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShiftController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\DepartmentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Routes for all authenticated users
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Basic shift routes for all users
    Route::get('/shifts', [ShiftController::class, 'index'])->name('shifts.index');
    Route::get('/shifts/{shift}', [ShiftController::class, 'show'])->name('shifts.show');
    Route::post('/shifts/{shift}/comments', [ShiftController::class, 'addComment'])->name('shifts.comments.store');
    
    // Employee-specific routes
    Route::middleware(['role:employee'])->group(function () {
        Route::post('/shifts/{shift}/apply', [ShiftController::class, 'apply'])->name('shifts.apply');
    });

    // Admin-specific routes
    Route::middleware(['role:admin'])->group(function () {
        Route::resource('shifts', ShiftController::class)->except(['index', 'show']);
        Route::post('/shifts/{shift}/approve', [ShiftController::class, 'approveApplication'])->name('shifts.approve');
        Route::resource('employees', EmployeeController::class);
        Route::resource('departments', DepartmentController::class);
    });
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
