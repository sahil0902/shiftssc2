<?php

namespace App\Http\Controllers;

use App\Models\Shift;
use App\Models\User;
use App\Models\Department;
use App\Models\ShiftApplication;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $isAdmin = $user->role === 'admin';
        
        // Charts data - available for both admin and employees
        $shiftStats = [
            'byDepartment' => Department::select('departments.name', DB::raw('COALESCE(COUNT(shifts.id), 0) as count'))
                ->where('departments.organization_id', $user->organization_id)
                ->leftJoin('shifts', 'departments.id', '=', 'shifts.department_id')
                ->groupBy('departments.id', 'departments.name')
                ->get()
                ->map(function ($item) {
                    return [
                        'name' => $item->name,
                        'value' => $item->count
                    ];
                }),
            'byStatus' => Shift::select('status', DB::raw('count(*) as count'))
                ->where('shifts.organization_id', $user->organization_id)
                ->groupBy('status')
                ->orderBy('status')
                ->get()
                ->map(function ($item) {
                    return [
                        'name' => ucfirst($item->status),
                        'value' => $item->count
                    ];
                })
        ];
        
        if ($isAdmin) {
            // Admin stats
            $stats = [
                'totalShifts' => Shift::where('organization_id', $user->organization_id)->count(),
                'totalEmployees' => User::where('organization_id', $user->organization_id)
                    ->where('role', 'employee')
                    ->count(),
                'totalDepartments' => Department::where('organization_id', $user->organization_id)->count(),
                'openShifts' => Shift::where('organization_id', $user->organization_id)
                    ->where('status', 'open')
                    ->count(),
            ];

            return Inertia::render('Dashboard', [
                'stats' => $stats,
                'shiftStats' => $shiftStats
            ]);
        } else {
            // Employee stats
            $stats = [
                'approvedShifts' => ShiftApplication::where('shift_applications.user_id', $user->id)
                    ->where('shift_applications.status', 'approved')
                    ->count(),
                'totalApplications' => ShiftApplication::where('shift_applications.user_id', $user->id)
                    ->count(),
                'totalHours' => ShiftApplication::where('shift_applications.user_id', $user->id)
                    ->where('shift_applications.status', 'approved')
                    ->join('shifts', 'shift_applications.shift_id', '=', 'shifts.id')
                    ->sum('shifts.total_hours'),
                'totalEarnings' => ShiftApplication::where('shift_applications.user_id', $user->id)
                    ->where('shift_applications.status', 'approved')
                    ->join('shifts', 'shift_applications.shift_id', '=', 'shifts.id')
                    ->sum('shifts.total_wage'),
            ];

            // Get shifts from user's department
            $departmentShifts = Shift::with('department')
                ->where('organization_id', $user->organization_id)
                ->where('department_id', $user->department_id)
                ->where('status', 'open')
                ->latest()
                ->take(5)
                ->get()
                ->map(function ($shift) {
                    return [
                        ...$shift->toArray(),
                        'formatted_hourly_rate' => $shift->formatted_hourly_rate,
                        'duration' => $shift->duration,
                        'department' => [
                            'id' => $shift->department->id,
                            'name' => $shift->department->name
                        ]
                    ];
                });

            // Get shifts from other departments
            $otherShifts = Shift::with('department')
                ->where('organization_id', $user->organization_id)
                ->where('department_id', '!=', $user->department_id)
                ->where('status', 'open')
                ->latest()
                ->take(5)
                ->get()
                ->map(function ($shift) {
                    return [
                        ...$shift->toArray(),
                        'formatted_hourly_rate' => $shift->formatted_hourly_rate,
                        'duration' => $shift->duration,
                        'department' => [
                            'id' => $shift->department->id,
                            'name' => $shift->department->name
                        ]
                    ];
                });

            return Inertia::render('Dashboard', [
                'departmentShifts' => $departmentShifts,
                'otherShifts' => $otherShifts,
                'stats' => $stats,
                'shiftStats' => $shiftStats
            ]);
        }
    }
} 