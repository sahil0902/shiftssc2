<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DepartmentController extends Controller
{
    public function index(Request $request)
    {
        $query = Department::query()
            ->where('organization_id', Auth::user()->organization_id);

        // Search by name or code
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('code', 'like', "%{$search}%");
            });
        }

        // Filter by active status
        if ($request->has('is_active')) {
            $query->where('is_active', $request->boolean('is_active'));
        }

        return $query->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:50',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $validated['organization_id'] = Auth::user()->organization_id;
        
        $department = Department::create($validated);
        return $department;
    }

    public function show(Department $department)
    {
        $this->authorize('view', $department);
        return $department;
    }

    public function update(Request $request, Department $department)
    {
        $this->authorize('update', $department);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'code' => 'sometimes|string|max:50',
            'description' => 'nullable|string',
            'is_active' => 'boolean',
        ]);

        $department->update($validated);
        return $department;
    }

    public function destroy(Department $department)
    {
        $this->authorize('delete', $department);
        
        // Check if department has any shifts
        if ($department->shifts()->exists()) {
            return response()->json([
                'message' => 'Cannot delete department with existing shifts'
            ], 422);
        }

        $department->delete();
        return response()->noContent();
    }
} 