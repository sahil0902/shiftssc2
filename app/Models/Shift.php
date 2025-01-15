<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // Import HasFactory trait for factory support
use Illuminate\Database\Eloquent\Model; // Import Model class for Eloquent ORM
use Illuminate\Database\Eloquent\Relations\BelongsTo; // Import BelongsTo for defining relationships
use Illuminate\Database\Eloquent\Relations\HasMany; // Import HasMany for defining relationships

class Shift extends Model
{
    use HasFactory; // Enable factory methods for this model

    protected $guarded = [
        'id', // 'id' should not be mass assignable for security reasons
    ];
    
    protected $casts = [
        'start_time' => 'datetime', // Cast start_time to a datetime object
        'end_time' => 'datetime', // Cast end_time to a datetime object
        'hourly_rate' => 'decimal:2', // Cast hourly_rate to a decimal with 2 decimal places
        'total_hours' => 'decimal:2', // Cast total_hours to a decimal with 2 decimal places
        'total_wage' => 'decimal:2' // Cast total_wage to a decimal with 2 decimal places
    ];

    protected $appends = [
        'formatted_hourly_rate', // Append formatted hourly rate to the model's attributes
        'formatted_total_wage' // Append formatted total wage to the model's attributes
    ];

    protected static function boot()
    {
        parent::boot(); // Call the parent boot method

        static::saving(function ($shift) {
            // Calculate total hours and wage before saving the shift
            $shift->calculateTotals();
        });
    }

    public function calculateTotals()
    {
        // Calculate total hours and wage based on start and end times
        if ($this->start_time && $this->end_time) {
            // Use abs() to ensure positive duration
            $this->total_hours = abs($this->end_time->diffInHours($this->start_time)); // Calculate total hours
            $this->total_wage = $this->total_hours * $this->hourly_rate; // Calculate total wage
        }
    }

    public function getDurationAttribute()
    {
        // Calculate the duration of the shift
        if ($this->start_time && $this->end_time) {
            return abs($this->end_time->diffInHours($this->start_time)); // Return the absolute difference in hours
        }
        return 0; // Return 0 if start or end time is not set
    }

    public function getTotalWageAttribute()
    {
        // Calculate total wage based on duration and hourly rate
        return $this->duration * $this->hourly_rate; // Return total wage
    }

    public function getFormattedHourlyRateAttribute(): string
    {
        // Format the hourly rate for display
        return '£' . number_format($this->hourly_rate, 2); // Return formatted hourly rate
    }

    public function getFormattedTotalWageAttribute(): string
    {
        // Format the total wage for display
        return '£' . number_format($this->total_wage, 2); // Return formatted total wage
    }

    public function user(): BelongsTo
    {
        // Define the relationship with the User model
        return $this->belongsTo(User::class); // Return the user associated with this shift
    }

    public function department(): BelongsTo
    {
        // Define the relationship with the Department model
        return $this->belongsTo(Department::class); // Return the department associated with this shift
    }

    public function organization(): BelongsTo
    {
        // Define the relationship with the Organization model
        return $this->belongsTo(Organization::class); // Return the organization associated with this shift
    }

    public function applications(): HasMany
    {
        // Define the relationship with the ShiftApplication model
        return $this->hasMany(ShiftApplication::class); // Return the applications associated with this shift
    }

    public function comments(): HasMany
    {
        // Define the relationship with the ShiftComment model
        return $this->hasMany(ShiftComment::class); // Return the comments associated with this shift
    }
} 