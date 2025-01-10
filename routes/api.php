<?php

use App\Http\Controllers\API\DepartmentController;
use App\Http\Controllers\API\ShiftController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth:sanctum'])->group(function () {
    // Department routes
    Route::apiResource('departments', DepartmentController::class);
    
    // Shift routes
    Route::apiResource('shifts', ShiftController::class);
    Route::post('shifts/{shift}/apply', [ShiftController::class, 'apply']);
    Route::post('shifts/{shift}/applications/{application}', [ShiftController::class, 'reviewApplication']);
}); 