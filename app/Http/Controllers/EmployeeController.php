<?php

namespace App\Http\Controllers;

use App\Models\User; // Import the User model to manage employee data
use App\Models\Department; // Import the Department model to associate employees with departments
use Illuminate\Http\Request; // Import the Request class for handling HTTP requests
use Inertia\Inertia; // Import Inertia for rendering views
use Illuminate\Support\Facades\Auth; // Import Auth facade for authentication

class EmployeeController extends Controller
{
    // Display a listing of employees
    public function index()
    {
        return Inertia::render('Employees/Index', [
            'employees' => User::query() // Start a query on the User model
                ->where('organization_id', auth()->user()->organization_id) // Filter employees by the authenticated user's organization
                ->with(['department', 'roles']) // Eager load department and roles relationships
                ->orderBy('name') // Order employees by their name
                ->paginate(10), // Paginate results, 10 per page
            'flash' => [ // Flash messages for success and error notifications
                'success' => session('success'),
                'error' => session('error')
            ]
        ]);
    }

    // Show the form for creating a new employee
    public function create()
    {
        return Inertia::render('Employees/Create', [
            'departments' => Department::all(), // Retrieve all departments for selection
        ]);
    }

    // Handle the incoming request to store a new employee
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'name' => 'required|string|max:255', // Name is required and must be a string with a max length
            'email' => 'required|email|unique:users', // Email is required, must be unique in users table
            'password' => 'required|min:8', // Password is required and must be at least 8 characters
            'department_id' => 'required|exists:departments,id', // Department ID is required and must exist in departments table
        ]);

        // Set the role and organization ID for the new user
        $validated['role'] = 'employee';
        $validated['organization_id'] = Auth::user()->organization_id;
        
        // Create the new user and assign the role
        $user = User::create($validated);
        $user->assignRole('employee-' . Auth::user()->organization_id);

        // Redirect to the employees index with a success message
        return redirect()->route('employees.index')
            ->with('success', 'Employee created successfully.');
    }

    // Display the specified employee's details
    public function show(User $employee)
    {
        return Inertia::render('Employees/Show', [
            'employee' => $employee->load('department'), // Load the department relationship for the employee
        ]);
    }

    // Show the form for editing the specified employee
    public function edit(User $employee)
    {
        return Inertia::render('Employees/Edit', [
            'employee' => $employee->load('department'), // Load the department relationship for the employee
            'departments' => Department::all(), // Retrieve all departments for selection
        ]);
    }

    // Handle the incoming request to update the specified employee
    public function update(Request $request, User $employee)
    {
        // Validate the incoming request data for updating the employee
        $validated = $request->validate([
            'name' => 'required|string|max:255', // Name is required and must be a string with a max length
            'email' => 'required|email|unique:users,email,' . $employee->id, // Email must be unique except for the current employee
            'department_id' => 'required|exists:departments,id', // Department ID is required and must exist in departments table
        ]);

        // If a new password is provided, hash it before saving
        if ($request->filled('password')) {
            $validated['password'] = bcrypt($request->password);
        }

        // Update the employee with validated data
        $employee->update($validated);

        // Redirect to the employees index with a success message
        return redirect()->route('employees.index')
            ->with('success', 'Employee updated successfully.');
    }

    // Remove the specified employee from storage
    public function destroy(User $employee)
    {
        $employee->delete(); // Delete the employee record

        // Redirect to the employees index with a success message
        return redirect()->route('employees.index')
            ->with('success', 'Employee deleted successfully.');
    }
} 