<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Department;
use App\Models\Organization;
use Illuminate\Support\Facades\Hash;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_update_employee_profile()
    {
        $user = User::factory()->create();
        
        $user->update([
            'name' => 'Updated Name',
            'email' => 'updated@example.com'
        ]);
        
        $this->assertEquals('Updated Name', $user->fresh()->name);
        $this->assertEquals('updated@example.com', $user->fresh()->email);
    }

    public function test_password_is_hashed_when_set()
    {
        $user = User::factory()->create();
        $plainPassword = 'password123';
        
        $user->update([
            'password' => Hash::make($plainPassword)
        ]);
        
        $hashedPassword = $user->fresh()->password;
        
        // Verify the password was hashed using Bcrypt
        $this->assertTrue(str_starts_with($hashedPassword, '$2y$'));
        $this->assertTrue(Hash::check($plainPassword, $hashedPassword));
        $this->assertNotEquals($plainPassword, $hashedPassword);
    }

    public function test_can_verify_correct_password()
    {
        $user = User::factory()->create([
            'password' => Hash::make('correct-password')
        ]);
        
        $this->assertTrue(Hash::check('correct-password', $user->password));
    }

    public function test_can_check_user_role()
    {
        $organization = Organization::factory()->create();
        $roleName = 'employee-' . $organization->id;
        
        // Create the role first
        Role::create(['name' => $roleName]);
        
        $user = User::factory()->create([
            'organization_id' => $organization->id
        ]);
        
        $user->assignRole($roleName);
        
        $this->assertTrue($user->hasRole($roleName));
    }

    public function test_user_belongs_to_organization()
    {
        $organization = Organization::factory()->create();
        $user = User::factory()->create([
            'organization_id' => $organization->id
        ]);
        
        $this->assertInstanceOf(Organization::class, $user->organization);
        $this->assertEquals($organization->id, $user->organization->id);
    }

    public function test_user_belongs_to_department()
    {
        $department = Department::factory()->create();
        $user = User::factory()->create([
            'department_id' => $department->id
        ]);
        
        $this->assertInstanceOf(Department::class, $user->department);
        $this->assertEquals($department->id, $user->department->id);
    }
}
