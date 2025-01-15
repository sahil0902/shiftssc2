<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // Import HasFactory trait for factory support
use Illuminate\Database\Eloquent\Model; // Import Model class for Eloquent ORM
use Illuminate\Database\Eloquent\Relations\BelongsToMany; // Import BelongsToMany for defining many-to-many relationships

class Permission extends Model
{
    use HasFactory; // Use the HasFactory trait to enable factory methods for this model

    // Define the attributes that are mass assignable
    protected $fillable = [
        'name',        // The name of the permission
        'slug',        // A URL-friendly version of the name
        'description', // A brief description of the permission
    ];

    // Define the many-to-many relationship with the Role model
    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(Role::class); // Return the roles associated with this permission
    }

    // Boot method to handle model events
    protected static function boot()
    {
        parent::boot(); // Call the parent boot method

        // Event listener for the creating event
        static::creating(function ($permission) {
            // Automatically generate a slug if it is not provided
            if (empty($permission->slug)) {
                $permission->slug = \Str::slug($permission->name); // Create a slug from the permission name
            }
        });
    }
} 