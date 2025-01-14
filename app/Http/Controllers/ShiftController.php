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
        $user = Auth::user()->load('roles');
        
        $shifts = Shift::with(['department', 'user'])
            ->when($user->hasRole('employee'), function ($query) {
                return $query->where('status', 'open');
            })
            ->latest()
            ->paginate(10);

        return Inertia::render('Shifts/Index', [
            'shifts' => $shifts,
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
        return Inertia::render('Shifts/Create', [
            'departments' => Department::all(),
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
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'department_id' => 'required|exists:departments,id',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'required_employees' => 'required|integer|min:1',
            'status' => 'required|in:open,filled,cancelled'
        ]);

        $validated['user_id'] = Auth::id();
        
        $shift = Shift::create($validated);

        return redirect()->route('shifts.index')
            ->with('success', 'Shift created successfully.');
    }

    public function show(Shift $shift)
    {
        $user = Auth::user()->load('roles');
        $shift->load(['department', 'user', 'comments.user', 'claimedBy']);
        
        return Inertia::render('Shifts/Show', [
            'shift' => $shift,
            'auth' => [
                'user' => array_merge($user->toArray(), [
                    'roles' => $user->roles->pluck('name')->toArray()
                ])
            ]
        ]);
    }

    public function edit(Shift $shift)
    {
        $user = Auth::user()->load('roles');
        return Inertia::render('Shifts/Edit', [
            'shift' => $shift,
            'departments' => Department::all(),
            'auth' => [
                'user' => array_merge($user->toArray(), [
                    'roles' => $user->roles->pluck('name')->toArray()
                ])
            ]
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

    public function claim(Shift $shift)
    {
        $user = Auth::user()->load('roles');
        
        if (!$user->hasRole(['employee', 'Employee'])) {
            return back()->with('error', 'Only employees can claim shifts.');
        }

        if ($shift->status !== 'open') {
            return back()->with('error', 'This shift is no longer available.');
        }

        // Update the shift status and assign it to the current user
        $shift->update([
            'status' => 'filled',
            'claimed_by' => Auth::id(),
            'claimed_at' => now()
        ]);

        return back()->with('success', 'Shift claimed successfully.');
    }

    public function addComment(Request $request, Shift $shift)
    {
        $validated = $request->validate([
            'content' => 'required|string'
        ]);

        $comment = $shift->comments()->create([
            'user_id' => Auth::id(),
            'content' => $validated['content']
        ]);

        return redirect()->back()
            ->with('success', 'Comment added successfully.');
    }
}