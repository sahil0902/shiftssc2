<?php

namespace App\Http\Controllers;

use App\Models\Shift; // Import the Shift model to manage shift data
use App\Models\Department; // Import the Department model for department-related operations
use App\Notifications\ShiftApplicationNotification; // Import notification class for shift applications
use Illuminate\Http\Request; // Import the Request class for handling HTTP requests
use Inertia\Inertia; // Import Inertia for rendering views
use Illuminate\Support\Facades\Auth; // Import Auth facade for authentication

class ShiftController extends Controller
{
    // Display a listing of shifts
    public function index()
    {
        // Fetch shifts with their associated department
        $shifts = Shift::with(['department'])
            // Filter shifts based on user role
            ->when(Auth::user()->role === 'employee', function ($query) {
                // Exclude shifts already applied for by the user and only show open shifts
                return $query->whereDoesntHave('applications', function ($q) {
                    $q->where('user_id', Auth::id());
                })->where('status', 'open');
            })
            ->latest() // Order shifts by the latest
            ->paginate(10) // Paginate results, 10 per page
            ->through(function ($shift) {
                // Transform shift data for the view
                return [
                    ...$shift->toArray(),
                    'formatted_hourly_rate' => $shift->formatted_hourly_rate, // Format hourly rate
                    'formatted_total_wage' => $shift->formatted_total_wage, // Format total wage
                    'duration_in_hours' => $shift->duration, // Include duration in hours
                ];
            });

        // Render the shifts index view with the shifts data and permissions
        return Inertia::render('Shifts/Index', [
            'shifts' => $shifts,
            'can' => [
                'create_shift' => Auth::user()->role === 'admin' // Check if user can create shifts
            ],
            'flash' => [
                'success' => session('success'), // Flash success message
                'error' => session('error') // Flash error message
            ],
        ]);
    }

    // Show the form for creating a new shift
    public function create()
    {
        // Check if the user is an admin
        if (Auth::user()->role !== 'admin') {
            return redirect()->route('shifts.index')
                ->with('error', 'Unauthorized action.'); // Redirect with error if not authorized
        }

        $departments = Department::all(); // Retrieve all departments for selection
        return Inertia::render('Shifts/Create', [
            'departments' => $departments // Pass departments to the view
        ]);
    }

    // Handle the incoming request to store a new shift
    public function store(Request $request)
    {
        // Check if the user is an admin
        if (Auth::user()->role !== 'admin') {
            \Log::error('Unauthorized attempt to create shift', [
                'user_id' => Auth::id(), // Log user ID
                'role' => Auth::user()->role // Log user role
            ]);
            return back()->with('error', 'Unauthorized action.'); // Redirect with error if not authorized
        }

        try {
            \Log::info('Received shift data:', $request->all()); // Log received data
            
            // Validate incoming request data
            $validated = $request->validate([
                'title' => 'required|string|max:255', // Title is required and must be a string
                'description' => 'required|string', // Description is required
                'department_id' => 'required|exists:departments,id', // Department ID must exist
                'start_time' => 'required|date', // Start time is required and must be a valid date
                'end_time' => 'required|date|after:start_time', // End time must be after start time
                'required_employees' => 'required|integer|min:1', // At least one employee is required
                'status' => 'required|in:open,filled,cancelled', // Status must be one of the specified values
                'hourly_rate' => 'required|numeric|min:0' // Hourly rate must be a non-negative number
            ]);

            \Log::info('Validation passed, validated data:', $validated); // Log validated data

            // Add user_id and organization_id to the validated data
            $validated['user_id'] = Auth::id(); // Set the user ID
            $validated['organization_id'] = Auth::user()->organization_id; // Set the organization ID
            
            // Calculate total hours and wage
            $startTime = new \DateTime($validated['start_time']); // Create DateTime object for start time
            $endTime = new \DateTime($validated['end_time']); // Create DateTime object for end time
            $hours = $endTime->diff($startTime)->h + ($endTime->diff($startTime)->days * 24); // Calculate total hours
            
            $validated['total_hours'] = $hours; // Set total hours
            $validated['total_wage'] = $hours * floatval($validated['hourly_rate']); // Calculate total wage
            $validated['hourly_rate'] = floatval($validated['hourly_rate']); // Ensure hourly rate is a float
            
            $shift = Shift::create($validated); // Create the new shift
            
            \Log::info('Created shift successfully:', $shift->toArray()); // Log successful creation

            return redirect()
                ->route('shifts.index') // Redirect to shifts index
                ->with('success', 'Shift created successfully'); // Flash success message

        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Validation failed:', [
                'errors' => $e->errors(), // Log validation errors
                'request_data' => $request->all() // Log request data
            ]);
            return back()
                ->withErrors($e->errors()) // Return with validation errors
                ->withInput(); // Retain input data
        } catch (\Exception $e) {
            \Log::error('Error creating shift:', [
                'error' => $e->getMessage(), // Log error message
                'trace' => $e->getTraceAsString(), // Log error trace
                'request_data' => $request->all() // Log request data
            ]);
            
            return back()
                ->withInput() // Retain input data
                ->with('error', 'Error creating shift: ' . $e->getMessage()); // Flash error message
        }
    }

    // Display the specified shift's details
    public function show(Shift $shift)
    {
        try {
            \Log::info('Starting to load shift:', ['shift_id' => $shift->id]); // Log shift loading
            
            // Load related data for the shift
            $shift->load(['department', 'applications.user', 'comments.user', 'user']);
            
            // Prepare shift data for the response
            $shiftData = [
                ...$shift->toArray(),
                'formatted_hourly_rate' => $shift->formatted_hourly_rate, // Format hourly rate
                'formatted_total_wage' => $shift->formatted_total_wage, // Format total wage
                'duration_in_hours' => $shift->duration, // Include duration in hours
            ];
            
            \Log::info('Loaded shift data:', [
                'shift' => $shiftData, // Log loaded shift data
                'has_department' => $shift->department !== null, // Check if department exists
                'has_comments' => $shift->comments !== null, // Check if comments exist
                'comments_count' => $shift->comments ? $shift->comments->count() : 0, // Count comments
                'has_user' => $shift->user !== null, // Check if user exists
            ]);

            // Render the shift details view
            return Inertia::render('Shifts/Show', [
                'shift' => $shiftData, // Pass shift data to the view
                'can' => [
                    'user' => Auth::user(), // Pass authenticated user
                    'edit_shift' => Auth::user()->role === 'admin', // Check if user can edit shift
                    'delete_shift' => Auth::user()->role === 'admin', // Check if user can delete shift
                    'apply_shift' => Auth::user()->role === 'employee', // Check if user can apply for shift
                    'approve_application' => Auth::user()->role === 'admin' // Check if user can approve applications
                ]
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in show method:', [
                'error' => $e->getMessage(), // Log error message
                'trace' => $e->getTraceAsString() // Log error trace
            ]);
            
            return redirect()->route('shifts.index') // Redirect to shifts index
                ->with('error', 'Error loading shift details. Please try again.'); // Flash error message
        }
    }

    // Show the form for editing the specified shift
    public function edit(Shift $shift)
    {
        // Check if the user is an admin
        if (Auth::user()->role !== 'admin') {
            return redirect()->route('shifts.index')
                ->with('error', 'Unauthorized action.'); // Redirect with error if not authorized
        }

        $departments = Department::all(); // Retrieve all departments for selection
        return Inertia::render('Shifts/Edit', [
            'shift' => $shift, // Pass shift data to the view
            'departments' => $departments // Pass departments to the view
        ]);
    }

    // Handle the incoming request to update the specified shift
    public function update(Request $request, Shift $shift)
    {
        // Check if the user is an admin
        if (Auth::user()->role !== 'admin') {
            return redirect()->route('shifts.index')
                ->with('error', 'Unauthorized action.'); // Redirect with error if not authorized
        }

        // Validate incoming request data
        $validated = $request->validate([
            'title' => 'required|string|max:255', // Title is required and must be a string
            'description' => 'required|string', // Description is required
            'department_id' => 'required|exists:departments,id', // Department ID must exist
            'start_time' => 'required|date', // Start time is required and must be a valid date
            'end_time' => 'required|date|after:start_time', // End time must be after start time
            'status' => 'required|in:open,filled,cancelled' // Status must be one of the specified values
        ]);

        $shift->update($validated); // Update the shift with validated data

        return redirect()->route('shifts.index') // Redirect to shifts index
            ->with('success', 'Shift updated successfully.'); // Flash success message
    }

    // Remove the specified shift from storage
    public function destroy(Shift $shift)
    {
        // Check if the user is an admin
        if (Auth::user()->role !== 'admin') {
            return redirect()->route('shifts.index')
                ->with('error', 'Unauthorized action.'); // Redirect with error if not authorized
        }

        $shift->delete(); // Delete the shift

        return redirect()->route('shifts.index') // Redirect to shifts index
            ->with('success', 'Shift deleted successfully.'); // Flash success message
    }

    // Handle the application for a shift
    public function apply(Shift $shift)
    {
        // Check if the user is an employee
        if (Auth::user()->role !== 'employee') {
            return redirect()->back()
                ->with('error', 'Only employees can apply for shifts.'); // Redirect with error if not authorized
        }

        // Check if the shift is open
        if ($shift->status !== 'open') {
            return redirect()->back()
                ->with('error', 'This shift is no longer available.'); // Redirect with error if shift is not open
        }

        // Check if the user has already applied for the shift
        if ($shift->applications()->where('user_id', Auth::id())->exists()) {
            return redirect()->back()
                ->with('error', 'You have already applied for this shift.'); // Redirect with error if already applied
        }

        // Create a new application for the shift
        $shift->applications()->create([
            'user_id' => Auth::id(), // Set the user ID
            'status' => 'pending' // Set application status to pending
        ]);

        return redirect()->back()
            ->with('success', 'Application submitted successfully.'); // Flash success message
    }

    // Approve a shift application
    public function approveApplication(Shift $shift, Request $request)
    {
        // Check if the user is an admin
        if (Auth::user()->role !== 'admin') {
            return redirect()->back()
                ->with('error', 'Only administrators can approve applications.'); // Redirect with error if not authorised
        }

        // Validate incoming request data
        $validated = $request->validate([
            'application_id' => 'required|exists:shift_applications,id' // Application ID must exist
        ]);

        // Find the application and update its status to approved
        $application = $shift->applications()->findOrFail($validated['application_id']);
        $application->update(['status' => 'approved']); // Update application status
        $shift->update(['status' => 'filled']); // Update shift status to filled

        // Send notification to the approved applicant
        $application->user->notify(new ShiftApplicationNotification($shift, 'approved'));

        // Reject other applications
        $shift->applications()
            ->where('id', '!=', $application->id) // Exclude the approved application
            ->get()
            ->each(function ($app) use ($shift) {
                $app->update(['status' => 'rejected']); // Update status to rejected
                $app->user->notify(new ShiftApplicationNotification($shift, 'rejected')); // Notify rejected applicants
            });

        return redirect()->back()
            ->with('success', 'Application approved successfully.'); // Flash success message
    }

    // Add a comment to a shift
    public function addComment(Request $request, Shift $shift)
    {
        try {
            \Log::info('Adding comment to shift:', [
                'shift_id' => $shift->id, // Log shift ID
                'user_id' => Auth::id(), // Log user ID
                'request_data' => $request->all() // Log request data
            ]);

            // Validate incoming request data
            $validated = $request->validate([
                'content' => 'required|string' // Content is required and must be a string
            ]);

            // Create a new comment for the shift
            $comment = $shift->comments()->create([
                'user_id' => Auth::id(), // Set the user ID
                'content' => $validated['content'] // Set the comment content
            ]);

            \Log::info('Comment added successfully:', [
                'comment_id' => $comment->id, // Log comment ID
                'shift_id' => $shift->id // Log shift ID
            ]);

            return redirect()->back()
                ->with('success', 'Comment added successfully.'); // Flash success message
        } catch (\Exception $e) {
            \Log::error('Error adding comment:', [
                'error' => $e->getMessage(), // Log error message
                'trace' => $e->getTraceAsString(), // Log error trace
                'shift_id' => $shift->id, // Log shift ID
                'user_id' => Auth::id() // Log user ID
            ]);

            return redirect()->back()
                ->withInput() // Retain input data
                ->with('error', 'Error adding comment. Please try again.'); // Flash error message
        }
    }
}