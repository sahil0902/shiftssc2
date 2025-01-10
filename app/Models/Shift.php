<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Shift extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'department_id',
        'title',
        'description',
        'start_time',
        'end_time',
        'required_employees',
        'status',
    ];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function applications()
    {
        return $this->hasMany(ShiftApplication::class);
    }

    public function applicants()
    {
        return $this->belongsToMany(User::class, 'shift_applications')
            ->withPivot(['status'])
            ->withTimestamps();
    }

    public function comments()
    {
        return $this->hasMany(ShiftComment::class)->with('user')->latest();
    }
} 