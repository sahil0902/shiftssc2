<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Shift;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ShiftController extends Controller
{
    public function index(Request $request)
    {
        $query = Shift::query()
            ->where('organization_id', Auth::user()->organization_id)
            ->with(['department', 'user']);

        // Filter by status
        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // Filter by department
        if ($request->has('department_id')) {
            $query->where('department_id', $request->department_id);
        }

        // Filter by date range
        if ($request->has('start_date')) {
            $query->where('shift_date', '>=', $request->start_date);
        }
        if ($request->has('end_date')) {
            $query->where('shift_date', '<=', $request->end_date);
        }

        // Search by title or description
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // Sort
        $sortField = $request->input('sort_field', 'shift_date');
        $sortDirection = $request->input('sort_direction', 'asc');
        $query->orderBy($sortField, $sortDirection);

        return $query->paginate($request->input('per_page', 10));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'department_id' => 'required|exists:departments,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'pay_rate' => 'required|numeric|min:0',
            'shift_date' => 'required|date',
            'shift_startTime' => 'required|date_format:H:i:s',
            'shift_endTime' => 'required|date_format:H:i:s|after:shift_startTime',
            'break_duration' => 'nullable|numeric|min:0',
            'shift_location' => 'required|string',
            'required_skills' => 'nullable|array',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:draft,published,assigned,in_progress,completed,cancelled',
        ]);

        $validated['organization_id'] = Auth::user()->organization_id;
        
        if ($validated['status'] === 'published') {
            $validated['published_at'] = now();
        }

        $shift = Shift::create($validated);
        return $shift->load('department', 'user');
    }

    public function show(Shift $shift)
    {
        $this->authorize('view', $shift);
        return $shift->load(['department', 'user', 'applications.user']);
    }

    public function update(Request $request, Shift $shift)
    {
        $this->authorize('update', $shift);

        $validated = $request->validate([
            'department_id' => 'sometimes|exists:departments,id',
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'pay_rate' => 'sometimes|numeric|min:0',
            'shift_date' => 'sometimes|date',
            'shift_startTime' => 'sometimes|date_format:H:i:s',
            'shift_endTime' => 'sometimes|date_format:H:i:s|after:shift_startTime',
            'break_duration' => 'nullable|numeric|min:0',
            'shift_location' => 'sometimes|string',
            'required_skills' => 'nullable|array',
            'priority' => 'sometimes|in:low,medium,high',
            'status' => 'sometimes|in:draft,published,assigned,in_progress,completed,cancelled',
        ]);

        if (isset($validated['status']) && $validated['status'] === 'published' && !$shift->published_at) {
            $validated['published_at'] = now();
        }

        $shift->update($validated);
        return $shift->load('department', 'user');
    }

    public function destroy(Shift $shift)
    {
        $this->authorize('delete', $shift);
        $shift->delete();
        return response()->noContent();
    }

    public function apply(Shift $shift, Request $request)
    {
        $this->authorize('apply', $shift);

        $validated = $request->validate([
            'notes' => 'nullable|string',
        ]);

        $application = $shift->applications()->create([
            'user_id' => Auth::id(),
            'status' => 'pending',
            'notes' => $validated['notes'] ?? null,
        ]);

        return $application->load('user');
    }

    public function reviewApplication(Shift $shift, Request $request, $applicationId)
    {
        $this->authorize('review', $shift);

        $validated = $request->validate([
            'status' => 'required|in:approved,rejected',
            'notes' => 'nullable|string',
        ]);

        $application = $shift->applications()->findOrFail($applicationId);
        
        $application->update([
            'status' => $validated['status'],
            'notes' => $validated['notes'] ?? null,
            'reviewed_at' => now(),
            'reviewed_by' => Auth::id(),
        ]);

        if ($validated['status'] === 'approved') {
            $shift->update([
                'status' => 'assigned',
                'user_id' => $application->user_id,
            ]);
        }

        return $application->load('user', 'reviewer');
    }
} 