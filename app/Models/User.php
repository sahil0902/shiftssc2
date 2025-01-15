<?php

namespace App\Models; // Define the namespace for the User model

use Illuminate\Database\Eloquent\Factories\HasFactory; // Import HasFactory trait for factory support
use Illuminate\Foundation\Auth\User as Authenticatable; // Extend the Authenticatable class for user authentication
use Illuminate\Notifications\Notifiable; // Import Notifiable trait for notification support
use Laravel\Sanctum\HasApiTokens; // Import HasApiTokens trait for API token management
use Spatie\Permission\Traits\HasRoles; // Import HasRoles trait for role management

class User extends Authenticatable // Define the User class extending Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles; // Use necessary traits for functionality

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name', // The user's name
        'email', // The user's email address
        'password', // The user's password
        'role', // The user's role within the organization
        'department_id', // The ID of the department the user belongs to
        'organization_id', // The ID of the organization the user belongs to
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password', // Hide the password attribute for security
        'remember_token', // Hide the remember token for security
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime', // Cast email_verified_at to a datetime object
    ];

    /**
     * Get the department that the user belongs to.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function department() // Define the relationship with the Department model
    {
        return $this->belongsTo(Department::class); // Return the department associated with this user
    }

    /**
     * Get the shifts for the user.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function shifts() // Define the relationship for shifts associated with the user
    {
        return $this->belongsToMany(Shift::class, 'shift_applications') // Many-to-many relationship with Shift model
            ->withPivot(['status']) // Include the status in the pivot table
            ->withTimestamps(); // Automatically manage timestamps for the pivot table
    }

    /**
     * Get the shifts that the user has applied for.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function appliedShifts() // Define the relationship for applied shifts
    {
        return $this->belongsToMany(Shift::class, 'shift_applications') // Many-to-many relationship with Shift model
            ->withPivot(['status']) // Include the status in the pivot table
            ->withTimestamps(); // Automatically manage timestamps for the pivot table
    }

    /**
     * Check if the user has admin role.
     *
     * @return bool
     */
    public function isAdmin() // Method to check if the user is an admin
    {
        return $this->hasRole('administrator-' . $this->organization_id); // Check for admin role based on organization ID
    }

    /**
     * Check if the user has employee role.
     *
     * @return bool
     */
    public function isEmployee() // Method to check if the user is an employee
    {
        return $this->hasRole('employee-' . $this->organization_id); // Check for employee role based on organization ID
    }

    /**
     * Get the organization that the user belongs to.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function organization() // Define the relationship with the Organization model
    {
        return $this->belongsTo(Organization::class); // Return the organization associated with this user
    }
}
