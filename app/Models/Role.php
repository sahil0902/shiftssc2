<?php

namespace App\Models; // Define the namespace for the Role model

use Spatie\Permission\Models\Role as SpatieRole; // Import the Spatie Role model for extended functionality
use Illuminate\Database\Eloquent\Relations\BelongsTo; // Import BelongsTo for defining relationships

class Role extends SpatieRole // Extend the Spatie Role model
{
    // Define the attributes that are mass assignable
    protected $fillable = [
        'name', // The name of the role
        'guard_name', // The name of the guard associated with the role
        'organization_id' // The ID of the organization that the role belongs to
    ];

    // Define the relationship with the Organization model
    public function organization(): BelongsTo
    {
        // Return the organization that this role belongs to
        return $this->belongsTo(Organization::class);
    }
} 