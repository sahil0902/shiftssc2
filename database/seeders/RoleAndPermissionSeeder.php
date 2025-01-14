<?php

namespace Database\Seeders;

use App\Models\Organization;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

class RoleAndPermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Clear existing roles and permissions
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        DB::table('role_has_permissions')->truncate();
        DB::table('model_has_roles')->truncate();
        DB::table('model_has_permissions')->truncate();
        DB::table('roles')->truncate();
        DB::table('permissions')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $permissions = [
            'view-dashboard',
            'manage-users',
            'view-users',
            'create-users',
            'edit-users',
            'delete-users',
            'manage-roles',
            'view-roles',
            'create-roles',
            'edit-roles',
            'delete-roles',
            'manage-shifts',
            'view-shifts',
            'create-shifts',
            'edit-shifts',
            'delete-shifts',
            'apply-to-shifts',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission, 'guard_name' => 'web']);
        }

        $organizations = Organization::all();

        foreach ($organizations as $organization) {
            // Create administrator role with organization-specific name
            $adminRole = Role::create([
                'name' => 'administrator-' . $organization->id,
                'guard_name' => 'web',
                'organization_id' => $organization->id
            ]);

            // Assign all permissions to admin
            $adminRole->givePermissionTo($permissions);

            // Create employee role with organization-specific name
            $employeeRole = Role::create([
                'name' => 'employee-' . $organization->id,
                'guard_name' => 'web',
                'organization_id' => $organization->id
            ]);

            // Assign limited permissions to employee
            $employeeRole->givePermissionTo([
                'view-dashboard',
                'view-shifts',
                'apply-to-shifts'
            ]);
        }
    }
} 