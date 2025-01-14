<?php

namespace App\Http\Controllers;

use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Validation\Rule;

class DepartmentController extends Controller
{
    public function index()
    {
        $departments = Department::query()
            ->where('organization_id', auth()->user()->organization_id)
            ->withCount(['users', 'shifts'])
            ->orderBy('name')
            ->paginate(10)
            ->through(fn ($department) => [
                'id' => $department->id,
                'name' => $department->name,
                'users_count' => $department->users_count,
                'shifts_count' => $department->shifts_count,
                'created_at' => $department->created_at,
                'updated_at' => $department->updated_at,
            ]);

        return Inertia::render('Departments/Index', [
            'departments' => $departments,
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Departments/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('departments')->where(function ($query) {
                    return $query->where('organization_id', auth()->user()->organization_id);
                })
            ],
        ]);

        $validated['organization_id'] = auth()->user()->organization_id;
        Department::create($validated);

        return redirect()->route('departments.index')
            ->with('success', 'Department created successfully.');
    }

    public function show(Department $department)
    {
        return Inertia::render('Departments/Show', [
            'department' => $department->load(['users', 'shifts']),
        ]);
    }

    public function edit(Department $department)
    {
        return Inertia::render('Departments/Edit', [
            'department' => $department,
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