<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class EmployeeController extends Controller
{
    public function index()
    {
        return Inertia::render('Employees/Index', [
            'employees' => User::query()
                ->where('organization_id', auth()->user()->organization_id)
                ->with(['department', 'roles'])
                ->orderBy('name')
                ->paginate(10),
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Employees/Create', [
            'departments' => Department::all(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'department_id' => 'required|exists:departments,id',
        ]);

        $validated['role'] = 'employee';
        $validated['organization_id'] = Auth::user()->organization_id;
        
        $user = User::create($validated);
        $user->assignRole('employee-' . Auth::user()->organization_id);

        return redirect()->route('employees.index')
            ->with('success', 'Employee created successfully.');
    }

    public function show(User $employee)
    {
        return Inertia::render('Employees/Show', [
            'employee' => $employee->load('department'),
        ]);
    }

    public function edit(User $employee)
    {
        return Inertia::render('Employees/Edit', [
            'employee' => $employee->load('department'),
            'departments' => Department::all(),
        ]);
    }

    public function update(Request $request, User $employee)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $employee->id,
            'department_id' => 'required|exists:departments,id',
        ]);

        if ($request->filled('password')) {
            $validated['password'] = bcrypt($request->password);
        }

        $employee->update($validated);

        return redirect()->route('employees.index')
            ->with('success', 'Employee updated successfully.');
    }

    public function destroy(User $employee)
    {
        $employee->delete();

        return redirect()->route('employees.index')
            ->with('success', 'Employee deleted successfully.');
    }
} 