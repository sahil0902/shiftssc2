<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Shift;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_employees' => User::role('employee')->count(),
            'open_shifts' => Shift::where('status', 'open')->count(),
            'total_departments' => Department::count(),
            'upcoming_shifts' => Shift::where('start_time', '>', now())
                ->where('start_time', '<', now()->addDay())
                ->count(),
            'recent_shifts' => Shift::with(['department'])
                ->latest()
                ->take(5)
                ->get(),
        ];

        return Inertia::render('Dashboard', [
            'stats' => $stats,
        ]);
    }
} 