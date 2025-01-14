<?php

namespace App\Policies;

use App\Models\Department;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DepartmentPolicy
{
    use HandlesAuthorization;

    public function viewAny(User $user): bool
    {
        return true; // All authenticated users can view departments list
    }

    public function view(User $user, Department $department): bool
    {
        return true; // All authenticated users can view department details
    }

    public function create(User $user): bool
    {
        return $user->hasRole('administrator');
    }

    public function update(User $user, Department $department): bool
    {
        return $user->hasRole('administrator');
    }

    public function delete(User $user, Department $department): bool
    {
        return $user->hasRole('administrator');
    }
} 