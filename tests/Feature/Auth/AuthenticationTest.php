<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthenticationTest extends TestCase
{
    use RefreshDatabase; // Use the RefreshDatabase trait to reset the database after each test

    // Test to ensure the login screen can be rendered successfully
    public function test_login_screen_can_be_rendered(): void
    {
        $response = $this->get('/login'); // Send a GET request to the login page

        $response->assertStatus(200); // Assert that the response status is 200 (OK)
    }

    // Test to verify that users can authenticate using the login screen
    public function test_users_can_authenticate_using_the_login_screen(): void
    {
        $user = User::factory()->create(); // Create a new user using the factory

        // Send a POST request to the login route with the user's credentials
        $response = $this->post('/login', [
            'email' => $user->email, // Use the created user's email
            'password' => 'password', // Use the correct password
        ]);

        $this->assertAuthenticated(); // Assert that the user is authenticated
        $response->assertRedirect(route('dashboard', absolute: false)); // Assert that the user is redirected to the dashboard
    }

    // Test to ensure users cannot authenticate with an invalid password
    public function test_users_can_not_authenticate_with_invalid_password(): void
    {
        $user = User::factory()->create(); // Create a new user using the factory

        // Attempt to log in with the wrong password
        $this->post('/login', [
            'email' => $user->email, // Use the created user's email
            'password' => 'wrong-password', // Use an incorrect password
        ]);

        $this->assertGuest(); // Assert that the user is still a guest (not authenticated)
    }

    // Test to verify that users can log out successfully
    public function test_users_can_logout(): void
    {
        $user = User::factory()->create(); // Create a new user using the factory

        // Act as the authenticated user and send a POST request to the logout route
        $response = $this->actingAs($user)->post('/logout');

        $this->assertGuest(); // Assert that the user is now a guest (logged out)
        $response->assertRedirect('/'); // Assert that the user is redirected to the home page
    }
}
