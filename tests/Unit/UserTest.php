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
    use RefreshDatabase; // Use RefreshDatabase trait to reset the database after each test

    // Test to verify that an employee's profile can be updated successfully
    public function test_can_update_employee_profile()
    {
        // Create a new user instance using the factory
        $user = User::factory()->create();
        
        // Update the user's name and email
        $user->update([
            'name' => 'Updated Name', // New name for the user
            'email' => 'updated@example.com' // New email for the user
        ]);
        
        // Assert that the user's name has been updated correctly
        $this->assertEquals('Updated Name', $user->fresh()->name);
        // Assert that the user's email has been updated correctly
        $this->assertEquals('updated@example.com', $user->fresh()->email);
    }

    // Test to ensure that the password is hashed when set
    public function test_password_is_hashed_when_set()
    {
        // Create a new user instance using the factory
        $user = User::factory()->create();
        $plainPassword = 'password123'; // Plain password to be hashed
        
        // Update the user's password with a hashed version
        $user->update([
            'password' => Hash::make($plainPassword) // Hash the plain password
        ]);
        
        // Retrieve the hashed password from the user instance
        $hashedPassword = $user->fresh()->password;
        
        // Verify the password was hashed using Bcrypt
        $this->assertTrue(str_starts_with($hashedPassword, '$2y$')); // Check if the hashed password starts with the Bcrypt identifier
        $this->assertTrue(Hash::check($plainPassword, $hashedPassword)); // Verify that the plain password matches the hashed password
        $this->assertNotEquals($plainPassword, $hashedPassword); // Ensure the hashed password is not the same as the plain password
    }

    // Test to verify that the correct password can be checked
    public function test_can_verify_correct_password()
    {
        // Create a new user with a known password
        $user = User::factory()->create([
            'password' => Hash::make('correct-password') // Hash the known password
        ]);
        
        // Assert that the correct password matches the user's hashed password
        $this->assertTrue(Hash::check('correct-password', $user->password));
    }

    // Test to check if a user has the correct role assigned
    public function test_can_check_user_role()
    {
        // Create a new organization for the user
        $organization = Organization::factory()->create();
        $roleName = 'employee-' . $organization->id; // Define the role name based on the organization ID
        
        // Create the role first
        Role::create(['name' => $roleName]); // Create a new role in the database
        
        // Create a new user associated with the organization
        $user = User::factory()->create([
            'organization_id' => $organization->id
        ]);
        
        // Assign the created role to the user
        $user->assignRole($roleName);
        
        // Assert that the user has the assigned role
        $this->assertTrue($user->hasRole($roleName));
    }

    // Test to verify that a user belongs to an organization
    public function test_user_belongs_to_organization()
    {
        // Create a new organization
        $organization = Organization::factory()->create();
        // Create a new user associated with the organization
        $user = User::factory()->create([
            'organization_id' => $organization->id
        ]);
        
        // Assert that the user's organization is an instance of the Organization class
        $this->assertInstanceOf(Organization::class, $user->organization);
        // Assert that the user's organization ID matches the expected organization ID
        $this->assertEquals($organization->id, $user->organization->id);
    }

    // Test to verify that a user belongs to a department
    public function test_user_belongs_to_department()
    {
        // Create a new department
        $department = Department::factory()->create();
        // Create a new user associated with the department
        $user = User::factory()->create([
            'department_id' => $department->id
        ]);
        
        // Assert that the user's department is an instance of the Department class
        $this->assertInstanceOf(Department::class, $user->department);
        // Assert that the user's department ID matches the expected department ID
        $this->assertEquals($department->id, $user->department->id);
    }
}
