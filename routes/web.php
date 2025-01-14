<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ShiftController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\DepartmentController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Public Routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Footer Pages (Public)
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/help', function () {
    return Inertia::render('Help');
})->name('help');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/faq', function () {
    return Inertia::render('FAQ');
})->name('faq');

Route::get('/privacy', function () {
    return Inertia::render('Privacy');
})->name('privacy');

Route::get('/terms', function () {
    return Inertia::render('Terms');
})->name('terms');

// Authenticated Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::resource('shifts', ShiftController::class);
    Route::post('/shifts/{shift}/apply', [ShiftController::class, 'apply'])->name('shifts.apply');
    Route::post('/shifts/{shift}/approve', [ShiftController::class, 'approveApplication'])->name('shifts.approve');
    Route::post('/shifts/{shift}/comments', [ShiftController::class, 'addComment'])->name('shifts.comments.store');

    Route::resource('employees', EmployeeController::class);
    Route::resource('departments', DepartmentController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
