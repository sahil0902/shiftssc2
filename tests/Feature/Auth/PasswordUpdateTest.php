<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Facades\Hash;

class PasswordUpdateTest extends TestCase
{
    use RefreshDatabase; // Use RefreshDatabase trait to reset the database after each test

    // Test to ensure the password can be updated successfully
    public function test_password_can_be_updated(): void
    {
        $user = User::factory()->create(); // Create a new user

        // Act as the authenticated user and attempt to update the password
        $response = $this
            ->actingAs($user)
            ->from('/profile') // Set the previous URL for redirection
            ->put('/password', [
                'current_password' => 'password', // Current password for verification
                'password' => 'new-password', // New password to set
                'password_confirmation' => 'new-password', // Confirmation of the new password
            ]);

        $response->assertSessionHasNoErrors(); // Assert that there are no errors in the session
        $response->assertRedirect('/profile'); // Assert that the user is redirected to the profile page
    }

    // Test to ensure the correct current password must be provided to update the password
    public function test_correct_password_must_be_provided_to_update_password(): void
    {
        $user = User::factory()->create(); // Create a new user

        // Attempt to update the password with an incorrect current password
        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->put('/password', [
                'current_password' => 'wrong-password', // Incorrect current password
                'password' => 'new-password', // New password to set
                'password_confirmation' => 'new-password', // Confirmation of the new password
            ]);

        $response->assertSessionHasErrors('current_password'); // Assert that there are errors for the current password
        $response->assertRedirect('/profile'); // Assert redirection to the profile page
    }

    // Test to ensure the new passwords must match
    public function test_new_passwords_must_match(): void
    {
        $user = User::factory()->create(); // Create a new user

        // Attempt to update the password with mismatched confirmation
        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->put('/password', [
                'current_password' => 'password', // Current password for verification
                'password' => 'new-password', // New password to set
                'password_confirmation' => 'different-password', // Mismatched confirmation
            ]);

        $response->assertSessionHasErrors('password'); // Assert that there are errors for the password
        $response->assertRedirect('/profile'); // Assert redirection to the profile page
    }

    // Test to ensure the new password must be different from the current password
    public function test_new_password_must_be_different_from_current(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('password'), // Set the current password
        ]);

        // Attempt to update the password to the same as the current password
        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->put('/password', [
                'current_password' => 'password', // Current password for verification
                'password' => 'password', // New password (same as current)
                'password_confirmation' => 'password', // Confirmation (same as current)
            ]);

        $response->assertSessionHasErrors(['password' => 'The new password must be different from your current password.']); // Assert specific error message
        $response->assertRedirect('/profile'); // Assert redirection to the profile page
    }

    // Test to ensure the password is actually updated when valid
    public function test_password_is_actually_updated_when_valid(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('old-password'), // Set the old password
        ]);

        // Attempt to update the password with the correct current password
        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->put('/password', [
                'current_password' => 'old-password', // Current password for verification
                'password' => 'new-password123', // New password to set
                'password_confirmation' => 'new-password123', // Confirmation of the new password
            ]);

        $response->assertSessionHasNoErrors(); // Assert that there are no errors in the session
        $response->assertRedirect('/profile'); // Assert redirection to the profile page
        
        // Verify the password was actually updated
        $this->assertTrue(Hash::check('new-password123', $user->fresh()->password)); // Assert new password is set
        $this->assertFalse(Hash::check('old-password', $user->fresh()->password)); // Assert old password is not set
    }

    // Test to ensure the password confirmation must match exactly
    public function test_password_confirmation_must_match_exactly(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('current-password'), // Set the current password
        ]);

        // Attempt to update the password with mismatched confirmation
        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->put('/password', [
                'current_password' => 'current-password', // Current password for verification
                'password' => 'new-password123', // New password to set
                'password_confirmation' => 'new-password124', // Slightly different confirmation
            ]);

        $response->assertSessionHasErrors('password'); // Assert that there are errors for the password
        $response->assertRedirect('/profile'); // Assert redirection to the profile page
        
        // Verify password wasn't changed
        $this->assertTrue(Hash::check('current-password', $user->fresh()->password)); // Assert current password remains unchanged
    }

    // Test to ensure the password and confirmation must match in a user scenario
    public function test_password_and_confirmation_must_match_user_scenario(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('12345678'), // Set the current password
        ]);

        // Attempt to update the password with mismatched confirmation
        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->put('/password', [
                'current_password' => '12345678', // Current password for verification
                'password' => '12345678', // New password (same as current)
                'password_confirmation' => 'msahil123'  // Different confirmation
            ]);

        $response->assertSessionHasErrors('password'); // Assert that there are errors for the password
        $response->assertRedirect('/profile'); // Assert redirection to the profile page
        
        // Verify password wasn't changed
        $this->assertTrue(Hash::check('12345678', $user->fresh()->password)); // Assert current password remains unchanged
    }
}
