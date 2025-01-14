<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Department extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'organization_id',
        'allows_casual_shifts'
    ];

    protected $casts = [
        'allows_casual_shifts' => 'boolean'
    ];

    public function shifts(): HasMany
    {
        return $this->hasMany(Shift::class);
    }

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }
} 