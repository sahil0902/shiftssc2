<?php

namespace Database\Seeders;

use App\Models\Organization;
use Illuminate\Database\Seeder;

class OrganizationSeeder extends Seeder
{
    public function run(): void
    {
        // Create a default organization
        Organization::factory()->create([
            'name' => 'ShiftsSync Demo',
            'slug' => 'shiftssync-demo',
            'domain' => 'demo.shiftssync.com',
            'settings' => [
                'theme' => [
                    'primary_color' => '#3b82f6',
                    'secondary_color' => '#1e40af',
                ],
                'notifications' => [
                    'email' => true,
                    'slack' => true,
                ],
                'shift_settings' => [
                    'min_hours' => 4,
                    'max_hours' => 12,
                    'break_duration' => 1,
                ],
            ],
        ]);

        // Create some random organizations
        Organization::factory(3)->create();
    }
} 