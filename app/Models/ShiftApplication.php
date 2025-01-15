<?php
/*
for future development when i will add a shift application system
*/
namespace App\Models; // Define the namespace for the ShiftApplication model

use Illuminate\Database\Eloquent\Factories\HasFactory; // Import HasFactory trait for factory support
use Illuminate\Database\Eloquent\Model; // Import Model class for Eloquent ORM

class ShiftApplication extends Model
{
    use HasFactory; // Enable factory methods for this model

    // Define the attributes that are mass assignable
    protected $fillable = [
        'user_id',      // The ID of the user applying for the shift
        'shift_id',     // The ID of the shift being applied for
        'status',       // The current status of the application (e.g., pending, approved, rejected)
        'notes',        // Any additional notes provided by the user
        'reviewed_at',  // Timestamp indicating when the application was reviewed
        'reviewed_by'   // The ID of the user who reviewed the application
    ];

    // Define the attributes that should be cast to native types
    protected $casts = [
        'reviewed_at' => 'datetime', // Cast reviewed_at to a datetime object
    ];

    // Define the relationship with the User model for the applicant
    public function user()
    {
        return $this->belongsTo(User::class); // Return the user associated with this application
    }

    // Define the relationship with the Shift model
    public function shift()
    {
        return $this->belongsTo(Shift::class); // Return the shift associated with this application
    }

    // Define the relationship with the User model for the reviewer
    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by'); // Return the user who reviewed this application
    }
} 