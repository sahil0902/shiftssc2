<?php

namespace App\Models; // Define the namespace for the ShiftComment model

use Illuminate\Database\Eloquent\Factories\HasFactory; // Import HasFactory trait for factory support
use Illuminate\Database\Eloquent\Model; // Import Model class for Eloquent ORM
use Illuminate\Database\Eloquent\Relations\BelongsTo; // Import BelongsTo for defining relationships

class ShiftComment extends Model
{
    use HasFactory; // Enable factory methods for this model

    // Define the attributes that are mass assignable
    protected $fillable = [
        'shift_id', // The ID of the shift this comment is associated with
        'user_id',  // The ID of the user who made the comment
        'content'   // The content of the comment
    ];

    // Eager load the user relationship by default
    protected $with = ['user'];

    // Define the attributes that should be cast to native types
    protected $casts = [
        'created_at' => 'datetime', // Cast created_at to a datetime object
        'updated_at' => 'datetime', // Cast updated_at to a datetime object
    ];

    // Define the relationship with the Shift model
    public function shift(): BelongsTo
    {
        return $this->belongsTo(Shift::class); // Return the shift associated with this comment
    }

    // Define the relationship with the User model
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class); // Return the user who made this comment
    }
} 