<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory; // Import HasFactory trait for factory support
use Illuminate\Database\Eloquent\Model; // Import Model class for Eloquent ORM

class Organization extends Model
{
    use HasFactory; // Use the HasFactory trait to enable factory methods

    // Define the attributes that are mass assignable
    protected $fillable = [
        'name',      // The name of the organization
        'slug',      // A URL-friendly version of the name
        'domain',    // The domain associated with the organization
        'logo_path', // The file path to the organization's logo
        'settings'   // Additional settings stored in JSON format
    ];

    // Define the attributes that should be cast to native types
    protected $casts = [
        'settings' => 'json', // Cast the settings attribute to JSON
    ];
} 