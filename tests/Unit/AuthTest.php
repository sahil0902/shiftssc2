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
    use RefreshDatabase;

    protected $organization;
    protected $department;

    protected function setUp(): void
    {
        parent::setUp();
        $this->organization = Organization::factory()->create([
            'name' => 'Test Organization',
            'slug' => Str::random(10),
        ]);
        $this->department = Department::factory()->create(['organization_id' => $this->organization->id]);
        
        // Seed roles and permissions
        $this->seed(RoleAndPermissionSeeder::class);
    }

    public function test_can_register_new_user()
    {
        $userData = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'department_id' => $this->department->id
        ];

        $response = $this->post('/register', $userData);

        $this->assertDatabaseHas('users', [
            'email' => 'test@example.com',
            'department_id' => $this->department->id,
            'organization_id' => $this->organization->id
        ]);

        $user = User::where('email', 'test@example.com')->first();
        $this->assertTrue($user->hasRole('employee-' . $this->organization->id));
    }

    public function test_can_login_user()
    {
        $user = User::factory()->create([
            'password' => Hash::make('password123'),
            'department_id' => $this->department->id,
            'organization_id' => $this->organization->id
        ]);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'password123'
        ]);

        $response->assertRedirect('/dashboard');
        $this->assertAuthenticatedAs($user);
    }

    public function test_cannot_login_with_invalid_credentials()
    {
        $user = User::factory()->create([
            'password' => Hash::make('password123'),
            'department_id' => $this->department->id,
            'organization_id' => $this->organization->id
        ]);

        $response = $this->post('/login', [
            'email' => $user->email,
            'password' => 'wrongpassword'
        ]);

        $response->assertSessionHasErrors();
        $this->assertGuest();
    }

    public function test_can_logout_user()
    {
        $user = User::factory()->create([
            'department_id' => $this->department->id,
            'organization_id' => $this->organization->id
        ]);

        $this->actingAs($user);
        $this->assertAuthenticated();

        $response = $this->post('/logout');
        
        $response->assertRedirect('/');
        $this->assertGuest();
    }
}
