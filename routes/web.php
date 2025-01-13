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

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard route
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Routes for both admin and employees
    Route::get('/shifts', [ShiftController::class, 'index'])->name('shifts.index');
    Route::get('/shifts/{shift}', [ShiftController::class, 'show'])->name('shifts.show');
    Route::post('/shifts/{shift}/comments', [ShiftController::class, 'addComment'])->name('shifts.comments.store');

    // Employee-only routes
    Route::middleware('role:employee')->group(function () {
        Route::post('/shifts/{shift}/apply', [ShiftController::class, 'apply'])->name('shifts.apply');
        Route::get('/shifts/my-applications', [ShiftController::class, 'myApplications'])->name('shifts.my-applications');
    });

    // Admin-only routes
    Route::group(['middleware' => ['auth', 'admin']], function () {
        Route::resource('departments', DepartmentController::class);
        Route::resource('employees', EmployeeController::class);
        Route::resource('shifts', ShiftController::class)->except(['index', 'show']);
        Route::post('/shifts/{shift}/approve', [ShiftController::class, 'approveApplication'])->name('shifts.approve');
    });

    // New routes for shift acceptance
    Route::post('/shifts/{shift}/accept', [ShiftController::class, 'acceptShift'])->name('shifts.accept');
    Route::post('/shifts/{shift}/reject', [ShiftController::class, 'rejectShift'])->name('shifts.reject');
    Route::get('/my-accepted-shifts', [ShiftController::class, 'myAcceptedShifts'])->name('shifts.accepted');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
});

// Profile routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
