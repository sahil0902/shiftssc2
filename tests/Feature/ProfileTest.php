<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ProfileTest extends TestCase
{
    use RefreshDatabase; // Use RefreshDatabase trait to reset the database after each test

    // Test to ensure the profile page is displayed correctly
    public function test_profile_page_is_displayed(): void
    {
        $user = User::factory()->create(); // Create a new user instance

        // Act as the authenticated user and send a GET request to the profile page
        $response = $this
            ->actingAs($user)
            ->get('/profile');

        // Assert that the response status is OK (200)
        $response->assertOk();
    }

    // Test to verify that profile information can be updated successfully
    public function test_profile_information_can_be_updated(): void
    {
        $user = User::factory()->create(); // Create a new user instance

        // Act as the authenticated user and send a PATCH request to update profile information
        $response = $this
            ->actingAs($user)
            ->patch('/profile', [
                'name' => 'Test User', // New name for the user
                'email' => 'test.updated@example.com', // New email for the user
            ]);

        // Assert that there are no errors in the session and the user is redirected to the profile page
        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/profile');

        $user->refresh(); // Refresh the user instance to get the latest data

        // Assert that the user's name and email have been updated correctly
        $this->assertSame('Test User', $user->name);
        $this->assertSame('test.updated@example.com', $user->email);
        $this->assertNull($user->email_verified_at); // Assert that the email verification status remains unchanged
    }

    // Test to ensure that the email verification status is unchanged when the email address is not modified
    public function test_email_verification_status_is_unchanged_when_the_email_address_is_unchanged(): void
    {
        $user = User::factory()->create(); // Create a new user instance

        // Act as the authenticated user and send a PATCH request with the same email
        $response = $this
            ->actingAs($user)
            ->patch('/profile', [
                'name' => 'Test User', // New name for the user
                'email' => $user->email, // Keep the same email
            ]);

        // Assert that there are no errors in the session and the user is redirected to the profile page
        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/profile');

        // Assert that the email verification status remains unchanged
        $this->assertNotNull($user->refresh()->email_verified_at);
    }

    // Test to verify that the user can delete their account
    public function test_user_can_delete_their_account(): void
    {
        $user = User::factory()->create(); // Create a new user instance

        // Act as the authenticated user and send a DELETE request to delete the account
        $response = $this
            ->actingAs($user)
            ->delete('/profile', [
                'password' => 'password', // Provide the password for verification
            ]);

        // Assert that there are no errors in the session and the user is redirected to the home page
        $response
            ->assertSessionHasNoErrors()
            ->assertRedirect('/');

        // Assert that the user is logged out and the user record no longer exists
        $this->assertGuest();
        $this->assertNull($user->fresh());
    }

    // Test to ensure that the correct password must be provided to delete the account
    public function test_correct_password_must_be_provided_to_delete_account(): void
    {
        $user = User::factory()->create(); // Create a new user instance

        // Act as the authenticated user and attempt to delete the account with an incorrect password
        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->delete('/profile', [
                'password' => 'wrong-password', // Incorrect password
            ]);

        // Assert that there are errors for the password and the user is redirected to the profile page
        $response
            ->assertSessionHasErrors('password')
            ->assertRedirect('/profile');

        // Assert that the user record still exists
        $this->assertNotNull($user->fresh());
    }
}
