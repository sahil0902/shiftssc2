<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Models\Department;
use App\Models\Organization;
use Database\Seeders\RoleAndPermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthTest extends TestCase
{
    use RefreshDatabase; // Use RefreshDatabase trait to reset the database after each test

    protected $organization; // Variable to hold the test organization
    protected $department; // Variable to hold the test department

    protected function setUp(): void
    {
        parent::setUp(); // Call the parent setUp method to ensure proper initialization

        // Create a test organization with a random slug
        $this->organization = Organization::factory()->create([
            'name' => 'Test Organization', // Name of the organization
            'slug' => Str::random(10), // Generate a random slug for the organization
        ]);

        // Create a test department associated with the created organization
        $this->department = Department::factory()->create(['organization_id' => $this->organization->id]);
        
        // Seed roles and permissions to ensure the necessary data is available for tests
        $this->seed(RoleAndPermissionSeeder::class);
    }

    // Test to verify that a new user can be registered successfully
    public function test_can_register_new_user()
    {
        // User data for registration
        $userData = [
            'name' => 'Test User', // Name of the user
            'email' => 'test@example.com', // Unique email for the user
            'password' => 'password123', // Password for the user
            'password_confirmation' => 'password123', // Confirm the password
            'department_id' => $this->department->id // Associate the user with the created department
        ];

        // Send a POST request to register the new user
        $response = $this->post('/register', $userData);

        // Assert that the user was created in the database with the correct details
        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com', // Check for the user's email
            'department_id' => $this->department->id, // Check for the associated department ID
            'organization_id' => $this->organization->id // Check for the associated organization ID
        ]);

        // Retrieve the newly created user from the database
        $user = User::where('email', 'test@example.com')->first();
        // Assert that the user has the correct role
        $this->assertTrue($user->hasRole('employee-' . $this->organization->id));
    }

    // Test to verify that a user can log in successfully
    public function test_can_login_user()
    {
        // Create a new user with a hashed password
        $user = User::factory()->create([
            'password' => Hash::make('password123'), // Hash the password for security
            'department_id' => $this->department->id, // Associate the user with the created department
            'organization_id' => $this->organization->id // Associate the user with the created organization
        ]);

        // Send a POST request to log in the user
        $response = $this->post('/login', [
            'email' => $user->email, // Use the user's email
            'password' => 'password123' // Use the correct password
        ]);

        // Assert that the user is redirected to the dashboard after logging in
        $response->assertRedirect('/dashboard');
        // Assert that the user is authenticated
        $this->assertAuthenticatedAs($user);
    }

    // Test to verify that login fails with invalid credentials
    public function test_cannot_login_with_invalid_credentials()
    {
        // Create a new user with a hashed password
        $user = User::factory()->create([
            'password' => Hash::make('password123'), // Hash the password for security
            'department_id' => $this->department->id, // Associate the user with the created department
            'organization_id' => $this->organization->id // Associate the user with the created organization
        ]);

        // Attempt to log in with an incorrect password
        $response = $this->post('/login', [
            'email' => $user->email, // Use the user's email
            'password' => 'wrongpassword' // Use an incorrect password
        ]);

        // Assert that there are errors in the session due to invalid credentials
        $response->assertSessionHasErrors();
        // Assert that the user is not authenticated
        $this->assertGuest();
    }

    // Test to verify that a user can log out successfully
    public function test_can_logout_user()
    {
        // Create a new user
        $user = User::factory()->create([
            'department_id' => $this->department->id, // Associate the user with the created department
            'organization_id' => $this->organization->id // Associate the user with the created organization
        ]);

        // Act as the authenticated user
        $this->actingAs($user);
        // Assert that the user is authenticated
        $this->assertAuthenticated();

        // Send a POST request to log out the user
        $response = $this->post('/logout');
        
        // Assert that the user is redirected to the home page after logging out
        $response->assertRedirect('/');
        // Assert that the user is no longer authenticated
        $this->assertGuest();
    }
}
