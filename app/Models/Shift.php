<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Shift extends Model
{
    use HasFactory;

    protected $guarded = [
        'id', // Assuming 'id' should not be mass assignable
    ];
    
    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
        'hourly_rate' => 'decimal:2',
        'total_hours' => 'decimal:2',
        'total_wage' => 'decimal:2'
    ];

    protected $appends = [
        'formatted_hourly_rate',
        'formatted_total_wage'
    ];

    protected static function boot()
    {
        parent::boot();

        static::saving(function ($shift) {
            // Calculate total hours and wage before saving
            $shift->calculateTotals();
        });
    }

    public function calculateTotals()
    {
        if ($this->start_time && $this->end_time) {
            // Use abs() to ensure positive duration
            $this->total_hours = abs($this->end_time->diffInHours($this->start_time));
            $this->total_wage = $this->total_hours * $this->hourly_rate;
        }
    }

    public function getDurationAttribute()
    {
        if ($this->start_time && $this->end_time) {
            return abs($this->end_time->diffInHours($this->start_time));
        }
        return 0;
    }

    public function getTotalWageAttribute()
    {
        return $this->duration * $this->hourly_rate;
    }

    public function getFormattedHourlyRateAttribute(): string
    {
        return '£' . number_format($this->hourly_rate, 2);
    }

    public function getFormattedTotalWageAttribute(): string
    {
        return '£' . number_format($this->total_wage, 2);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function applications(): HasMany
    {
        return $this->hasMany(ShiftApplication::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(ShiftComment::class);
    }
} 