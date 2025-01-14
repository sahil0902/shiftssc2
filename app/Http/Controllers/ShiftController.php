<?php

namespace App\Http\Controllers;

use App\Models\Shift;
use App\Models\Department;
use App\Notifications\ShiftApplicationNotification;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ShiftController extends Controller
{
    public function index()
    {
        $shifts = Shift::with(['department'])
            ->when(Auth::user()->role === 'employee', function ($query) {
                return $query->whereDoesntHave('applications', function ($q) {
                    $q->where('user_id', Auth::id());
                })->where('status', 'open');
            })
            ->latest()
            ->paginate(10)
            ->through(function ($shift) {
                return [
                    ...$shift->toArray(),
                    'formatted_hourly_rate' => $shift->formatted_hourly_rate,
                    'formatted_total_wage' => $shift->formatted_total_wage,
                    'duration_in_hours' => $shift->duration,
                ];
            });

        return Inertia::render('Shifts/Index', [
            'shifts' => $shifts,
            'can' => [
                'create_shift' => Auth::user()->role === 'admin'
            ],
            'flash' => [
                'success' => session('success'),
                'error' => session('error')
            ],
        ]);
    }

    public function create()
    {
        if (Auth::user()->role !== 'admin') {
            return redirect()->route('shifts.index')
                ->with('error', 'Unauthorized action.');
        }

        $departments = Department::all();
        return Inertia::render('Shifts/Create', [
            'departments' => $departments
        ]);
    }

    public function store(Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            \Log::error('Unauthorized attempt to create shift', [
                'user_id' => Auth::id(),
                'role' => Auth::user()->role
            ]);
            return back()->with('error', 'Unauthorized action.');
        }

        try {
            \Log::info('Received shift data:', $request->all());
            
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'department_id' => 'required|exists:departments,id',
                'start_time' => 'required|date',
                'end_time' => 'required|date|after:start_time',
                'required_employees' => 'required|integer|min:1',
                'status' => 'required|in:open,filled,cancelled',
                'hourly_rate' => 'required|numeric|min:0'
            ]);

            \Log::info('Validation passed, validated data:', $validated);

            // Add user_id and organization_id to the validated data
            $validated['user_id'] = Auth::id();
            $validated['organization_id'] = Auth::user()->organization_id;
            
            // Calculate total hours and wage
            $startTime = new \DateTime($validated['start_time']);
            $endTime = new \DateTime($validated['end_time']);
            $hours = $endTime->diff($startTime)->h + ($endTime->diff($startTime)->days * 24);
            
            $validated['total_hours'] = $hours;
            $validated['total_wage'] = $hours * floatval($validated['hourly_rate']);
            $validated['hourly_rate'] = floatval($validated['hourly_rate']);
            
            $shift = Shift::create($validated);
            
            \Log::info('Created shift successfully:', $shift->toArray());

            return redirect()
                ->route('shifts.index')
                ->with('success', 'Shift created successfully');

        } catch (\Illuminate\Validation\ValidationException $e) {
            \Log::error('Validation failed:', [
                'errors' => $e->errors(),
                'request_data' => $request->all()
            ]);
            return back()
                ->withErrors($e->errors())
                ->withInput();
        } catch (\Exception $e) {
            \Log::error('Error creating shift:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'request_data' => $request->all()
            ]);
            
            return back()
                ->withInput()
                ->with('error', 'Error creating shift: ' . $e->getMessage());
        }
    }

    public function show(Shift $shift)
    {
        try {
            \Log::info('Starting to load shift:', ['shift_id' => $shift->id]);
            
            $shift->load(['department', 'applications.user', 'comments.user', 'user']);
            
            // Add wage calculations to the response
            $shiftData = [
                ...$shift->toArray(),
                'formatted_hourly_rate' => $shift->formatted_hourly_rate,
                'formatted_total_wage' => $shift->formatted_total_wage,
                'duration_in_hours' => $shift->duration,
            ];
            
            \Log::info('Loaded shift data:', [
                'shift' => $shiftData,
                'has_department' => $shift->department !== null,
                'has_comments' => $shift->comments !== null,
                'comments_count' => $shift->comments ? $shift->comments->count() : 0,
                'has_user' => $shift->user !== null,
            ]);

            return Inertia::render('Shifts/Show', [
                'shift' => $shiftData,
                'can' => [
                    'user' => Auth::user(),
                    'edit_shift' => Auth::user()->role === 'admin',
                    'delete_shift' => Auth::user()->role === 'admin',
                    'apply_shift' => Auth::user()->role === 'employee',
                    'approve_application' => Auth::user()->role === 'admin'
                ]
            ]);
        } catch (\Exception $e) {
            \Log::error('Error in show method:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return redirect()->route('shifts.index')
                ->with('error', 'Error loading shift details. Please try again.');
        }
    }

    public function edit(Shift $shift)
    {
        if (Auth::user()->role !== 'admin') {
            return redirect()->route('shifts.index')
                ->with('error', 'Unauthorized action.');
        }

        $departments = Department::all();
        return Inertia::render('Shifts/Edit', [
            'shift' => $shift,
            'departments' => $departments
        ]);
    }

    public function update(Request $request, Shift $shift)
    {
        if (Auth::user()->role !== 'admin') {
            return redirect()->route('shifts.index')
                ->with('error', 'Unauthorized action.');
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'department_id' => 'required|exists:departments,id',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'status' => 'required|in:open,filled,cancelled'
        ]);

        $shift->update($validated);

        return redirect()->route('shifts.index')
            ->with('success', 'Shift updated successfully.');
    }

    public function destroy(Shift $shift)
    {
        if (Auth::user()->role !== 'admin') {
            return redirect()->route('shifts.index')
                ->with('error', 'Unauthorized action.');
        }

        $shift->delete();

        return redirect()->route('shifts.index')
            ->with('success', 'Shift deleted successfully.');
    }

    public function apply(Shift $shift)
    {
        if (Auth::user()->role !== 'employee') {
            return redirect()->back()
                ->with('error', 'Only employees can apply for shifts.');
        }

        if ($shift->status !== 'open') {
            return redirect()->back()
                ->with('error', 'This shift is no longer available.');
        }

        if ($shift->applications()->where('user_id', Auth::id())->exists()) {
            return redirect()->back()
                ->with('error', 'You have already applied for this shift.');
        }

        $shift->applications()->create([
            'user_id' => Auth::id(),
            'status' => 'pending'
        ]);

        return redirect()->back()
            ->with('success', 'Application submitted successfully.');
    }

    public function approveApplication(Shift $shift, Request $request)
    {
        if (Auth::user()->role !== 'admin') {
            return redirect()->back()
                ->with('error', 'Only administrators can approve applications.');
        }

        $validated = $request->validate([
            'application_id' => 'required|exists:shift_applications,id'
        ]);

        $application = $shift->applications()->findOrFail($validated['application_id']);
        $application->update(['status' => 'approved']);
        $shift->update(['status' => 'filled']);

        // Send notification to the approved applicant
        $application->user->notify(new ShiftApplicationNotification($shift, 'approved'));

        // Reject other applications
        $shift->applications()
            ->where('id', '!=', $application->id)
            ->get()
            ->each(function ($app) use ($shift) {
                $app->update(['status' => 'rejected']);
                $app->user->notify(new ShiftApplicationNotification($shift, 'rejected'));
            });

        return redirect()->back()
            ->with('success', 'Application approved successfully.');
    }

    public function addComment(Request $request, Shift $shift)
    {
        try {
            \Log::info('Adding comment to shift:', [
                'shift_id' => $shift->id,
                'user_id' => Auth::id(),
                'request_data' => $request->all()
            ]);

            $validated = $request->validate([
                'content' => 'required|string'
            ]);

            $comment = $shift->comments()->create([
                'user_id' => Auth::id(),
                'content' => $validated['content']
            ]);

            \Log::info('Comment added successfully:', [
                'comment_id' => $comment->id,
                'shift_id' => $shift->id
            ]);

            return redirect()->back()
                ->with('success', 'Comment added successfully.');
        } catch (\Exception $e) {
            \Log::error('Error adding comment:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'shift_id' => $shift->id,
                'user_id' => Auth::id()
            ]);

            return redirect()->back()
                ->withInput()
                ->with('error', 'Error adding comment. Please try again.');
        }
    }
}