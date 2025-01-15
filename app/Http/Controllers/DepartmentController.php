<?php

namespace App\Http\Controllers;

use App\Models\Department; // Import the Department model
use Illuminate\Http\Request; // Import the Request class for handling HTTP requests
use Inertia\Inertia; // Import Inertia for rendering views
use Illuminate\Validation\Rule; // Import Rule for validation rules

class DepartmentController extends Controller
{
    // Display a listing of the departments
    public function index()
    {
        // Query departments belonging to the authenticated user's organization
        $departments = Department::query()
            ->where('organization_id', auth()->user()->organization_id) // Filter by organization ID
            ->withCount(['users', 'shifts']) // Count related users and shifts
            ->orderBy('name') // Order departments by name
            ->paginate(10) // Paginate results, 10 per page
            ->through(fn ($department) => [ // Transform the department data for the view
                'id' => $department->id,
                'name' => $department->name,
                'users_count' => $department->users_count,
                'shifts_count' => $department->shifts_count,
                'created_at' => $department->created_at,
                'updated_at' => $department->updated_at,
            ]);

        // Render the Departments/Index view with the departments data and flash messages
        return Inertia::render('Departments/Index', [
            'departments' => $departments,
            'flash' => [
                'success' => session('success'), // Success message from session
                'error' => session('error') // Error message from session
            ]
        ]);
    }

    // Show the form for creating a new department
    public function create()
    {
        return Inertia::render('Departments/Create'); // Render the create view
    }

    // Store a newly created department in storage
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'name' => [
                'required', // Name is required
                'string', // Must be a string
                'max:255', // Maximum length of 255 characters
                Rule::unique('departments')->where(function ($query) {
                    // Ensure the department name is unique within the user's organization
                    return $query->where('organization_id', auth()->user()->organization_id);
                })
            ],
        ]);

        // Assign the organization ID to the validated data
        $validated['organization_id'] = auth()->user()->organization_id;
        Department::create($validated); // Create the new department

        // Redirect to the departments index with a success message
        return redirect()->route('departments.index')
            ->with('success', 'Department created successfully.'); // Flash success message
    }

    // Display the specified department
    public function show(Department $department)
    {
        // Load users and shifts related to the department and render the show view
        return Inertia::render('Departments/Show', [
            'department' => $department->load(['users', 'shifts']),
        ]);
    }

    // Show the form for editing the specified department
    public function edit(Department $department)
    {
        // Render the edit view with the department data
        return Inertia::render('Departments/Edit', [
            'department' => $department,
        ]);
    }

    // Update the specified department in storage
    public function update(Request $request, Department $department)
    {
        // Validate the incoming request data for updating the department
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:departments,name,' . $department->id, // Ensure name is unique except for the current department
        ]);

        $department->update($validated); // Update the department with validated data

        // Redirect to the departments index with a success message
        return redirect()->route('departments.index')
            ->with('success', 'Department updated successfully.'); // Flash success message
    }

    // Remove the specified department from storage
    public function destroy(Department $department)
    {
        // Check if the department has any associated users or shifts
        if ($department->users()->count() > 0 || $department->shifts()->count() > 0) {
            return back()->with('error', 'Cannot delete department with associated users or shifts.'); // Flash error message
        }

        $department->delete(); // Delete the department

        // Redirect to the departments index with a success message
        return redirect()->route('departments.index')
            ->with('success', 'Department deleted successfully.'); // Flash success message
    }
} 