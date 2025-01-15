<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // Import HasFactory trait for factory methods
use Illuminate\Database\Eloquent\Model; // Import Model class for Eloquent models
use Illuminate\Database\Eloquent\Relations\HasMany; // Import HasMany relation for defining one-to-many relationships
use Illuminate\Database\Eloquent\SoftDeletes; // Import SoftDeletes trait for soft delete functionality

class Department extends Model
{
    use HasFactory, SoftDeletes; // Use traits for factory methods and soft deletes

    protected $fillable = [ // Define fillable attributes for mass assignment
        'name', // Name of the department
        'organization_id', // Foreign key referencing the organization
        'allows_casual_shifts' // Boolean flag indicating if casual shifts are allowed
    ];

    protected $casts = [ // Define attribute casting for model attributes
        'allows_casual_shifts' => 'boolean' // Cast allows_casual_shifts to boolean type
    ];

    public function shifts(): HasMany // Define a one-to-many relationship with Shift model
    {
        return $this->hasMany(Shift::class); // Return the related shifts for this department
    }

    public function users(): HasMany // Define a one-to-many relationship with User model
    {
        return $this->hasMany(User::class); // Return the related users for this department
    }

    public function organization() // Define a many-to-one relationship with Organization model
    {
        return $this->belongsTo(Organization::class); // Return the organization that this department belongs to
    }
} 