<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DepartmentController extends Controller
{
    public function index()
    {
        $user = Auth::user()->load('roles');
        
        return Inertia::render('Departments/Index', [
            'departments' => Department::withCount(['users', 'shifts'])
                ->latest()
                ->paginate(10),
            'auth' => [
                'user' => array_merge($user->toArray(), [
                    'roles' => $user->roles->pluck('name')->toArray()
                ])
            ]
        ]);
    }

    public function create()
    {
        $user = Auth::user()->load('roles');
        return Inertia::render('Departments/Create', [
            'auth' => [
                'user' => array_merge($user->toArray(), [
                    'roles' => $user->roles->pluck('name')->toArray()
                ])
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:departments',
        ]);

        Department::create($validated);

        return redirect()->route('departments.index')
            ->with('success', 'Department created successfully.');
    }

    public function show(Department $department)
    {
        $user = Auth::user()->load('roles');
        return Inertia::render('Departments/Show', [
            'department' => $department->load(['users', 'shifts']),
            'auth' => [
                'user' => array_merge($user->toArray(), [
                    'roles' => $user->roles->pluck('name')->toArray()
                ])
            ]
        ]);
    }

    public function edit(Department $department)
    {
        $user = Auth::user()->load('roles');
        return Inertia::render('Departments/Edit', [
            'department' => $department,
            'auth' => [
                'user' => array_merge($user->toArray(), [
                    'roles' => $user->roles->pluck('name')->toArray()
                ])
            ]
        ]);
    }

    public function update(Request $request, Department $department)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:departments,name,' . $department->id,
        ]);

        $department->update($validated);

        return redirect()->route('departments.index')
            ->with('success', 'Department updated successfully.');
    }

    public function destroy(Department $department)
    {
        // Check if department has any users or shifts
        if ($department->users()->count() > 0 || $department->shifts()->count() > 0) {
            return back()->with('error', 'Cannot delete department with associated users or shifts.');
        }

        $department->delete();

        return redirect()->route('departments.index')
            ->with('success', 'Department deleted successfully.');
    }
} 