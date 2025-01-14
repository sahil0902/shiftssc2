<?php

namespace App\Policies;

use App\Models\Shift;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ShiftPolicy
{
    use HandlesAuthorization;

    public function claim(User $user, Shift $shift): bool
    {
        return $user->hasRole('employee') &&
               $shift->status === 'open' &&
               !$shift->claimed_by;
    }

    public function view(User $user, Shift $shift): bool
    {
        return true; // All authenticated users can view shifts
    }

    public function update(User $user, Shift $shift): bool
    {
        return $user->hasRole('administrator');
    }

    public function delete(User $user, Shift $shift): bool
    {
        return $user->hasRole('administrator');
    }

    public function apply(User $user, Shift $shift): bool
    {
        return $user->hasRole('employee') && $shift->status === 'open';
    }

    public function review(User $user, Shift $shift): bool
    {
        return $user->hasRole('administrator');
    }
} 