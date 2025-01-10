<?php

namespace Database\Seeders;

use App\Models\Organization;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            ['name' => 'View Dashboard', 'slug' => 'view-dashboard'],
            ['name' => 'Manage Users', 'slug' => 'manage-users'],
            ['name' => 'View Users', 'slug' => 'view-users'],
            ['name' => 'Create Users', 'slug' => 'create-users'],
            ['name' => 'Edit Users', 'slug' => 'edit-users'],
            ['name' => 'Delete Users', 'slug' => 'delete-users'],
            ['name' => 'Manage Roles', 'slug' => 'manage-roles'],
            ['name' => 'View Roles', 'slug' => 'view-roles'],
            ['name' => 'Create Roles', 'slug' => 'create-roles'],
            ['name' => 'Edit Roles', 'slug' => 'edit-roles'],
            ['name' => 'Delete Roles', 'slug' => 'delete-roles'],
            ['name' => 'Manage Shifts', 'slug' => 'manage-shifts'],
            ['name' => 'View Shifts', 'slug' => 'view-shifts'],
            ['name' => 'Create Shifts', 'slug' => 'create-shifts'],
            ['name' => 'Edit Shifts', 'slug' => 'edit-shifts'],
            ['name' => 'Delete Shifts', 'slug' => 'delete-shifts'],
            ['name' => 'Apply To Shifts', 'slug' => 'apply-to-shifts'],
        ];

        $createdPermissions = collect($permissions)->map(function ($permission) {
            return Permission::create($permission);
        });

        $organizations = Organization::all();

        $organizations->each(function ($organization) use ($createdPermissions) {
            $adminRole = Role::create([
                'organization_id' => $organization->id,
                'name' => 'Admin',
                'slug' => 'admin',
                'description' => 'Administrator role with full access',
            ]);

            $adminRole->permissions()->attach($createdPermissions);

            $employeeRole = Role::create([
                'organization_id' => $organization->id,
                'name' => 'Employee',
                'slug' => 'employee',
                'description' => 'Regular employee role',
            ]);

            $employeeRole->permissions()->attach(
                $createdPermissions->whereIn('slug', [
                    'view-dashboard',
                    'view-shifts',
                    'apply-to-shifts',
                ])
            );
        });
    }
} 