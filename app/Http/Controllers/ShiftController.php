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
            ->when(Auth::user()->isEmployee(), function ($query) {
                return $query->whereDoesntHave('applications', function ($q) {
                    $q->where('user_id', Auth::id());
                })->where('status', 'open');
            })
            ->latest()
            ->paginate(10);

        return Inertia::render('Shifts/Index', [
            'shifts' => $shifts
        ]);
    }

    public function create()
    {
        $departments = Department::all();
        return Inertia::render('Shifts/Create', [
            'departments' => $departments
        ]);
    }

    public function store(Request $request)
    {
        try {
            \Log::info('Received shift data:', $request->all());
            
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'department_id' => 'required|exists:departments,id',
                'start_time' => 'required|date',
                'end_time' => 'required|date|after:start_time',
                'required_employees' => 'required|integer|min:1',
                'status' => 'required|in:open,filled,cancelled'
            ]);

            // Add user_id to the validated data
            $validated['user_id'] = Auth::id();

            \Log::info('Validated shift data:', $validated);
            
            $shift = Shift::create($validated);
            
            \Log::info('Created shift:', $shift->toArray());

            return redirect()->route('shifts.index')
                ->with('success', 'Shift created successfully.');
        } catch (\Exception $e) {
            \Log::error('Error creating shift:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return redirect()->back()
                ->withInput()
                ->with('error', 'Error creating shift. Please try again.');
        }
    }

    public function show(Shift $shift)
    {
        try {
            \Log::info('Starting to load shift:', ['shift_id' => $shift->id]);
            
            $shift->load(['department', 'applications.user', 'comments.user', 'user']);
            
            \Log::info('Loaded shift data:', [
                'shift' => $shift->toArray(),
                'has_department' => $shift->department !== null,
                'has_comments' => $shift->comments !== null,
                'comments_count' => $shift->comments ? $shift->comments->count() : 0,
                'has_user' => $shift->user !== null,
            ]);

            return Inertia::render('Shifts/Show', [
                'shift' => $shift
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
        $departments = Department::all();
        return Inertia::render('Shifts/Edit', [
            'shift' => $shift,
            'departments' => $departments
        ]);
    }

    public function update(Request $request, Shift $shift)
    {
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
        $shift->delete();

        return redirect()->route('shifts.index')
            ->with('success', 'Shift deleted successfully.');
    }

    public function apply(Shift $shift)
    {
        if (!Auth::user()->isEmployee()) {
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
        if (!Auth::user()->isAdmin()) {
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