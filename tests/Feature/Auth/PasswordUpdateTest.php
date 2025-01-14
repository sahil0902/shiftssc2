<?php

namespace Tests\Feature\Auth;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Support\Facades\Hash;

class PasswordUpdateTest extends TestCase
{
    use RefreshDatabase;

    public function test_password_can_be_updated(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->put('/password', [
                'current_password' => 'password',
                'password' => 'new-password',
                'password_confirmation' => 'new-password',
            ]);

        $response->assertSessionHasNoErrors();
        $response->assertRedirect('/profile');
    }

    public function test_correct_password_must_be_provided_to_update_password(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->put('/password', [
                'current_password' => 'wrong-password',
                'password' => 'new-password',
                'password_confirmation' => 'new-password',
            ]);

        $response->assertSessionHasErrors('current_password');
        $response->assertRedirect('/profile');
    }

    public function test_new_passwords_must_match(): void
    {
        $user = User::factory()->create();

        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->put('/password', [
                'current_password' => 'password',
                'password' => 'new-password',
                'password_confirmation' => 'different-password',
            ]);

        $response->assertSessionHasErrors('password');
        $response->assertRedirect('/profile');
    }

    public function test_new_password_must_be_different_from_current(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('password'),
        ]);

        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->put('/password', [
                'current_password' => 'password',
                'password' => 'password',
                'password_confirmation' => 'password',
            ]);

        $response->assertSessionHasErrors(['password' => 'The new password must be different from your current password.']);
        $response->assertRedirect('/profile');
    }

    public function test_password_is_actually_updated_when_valid(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('old-password'),
        ]);

        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->put('/password', [
                'current_password' => 'old-password',
                'password' => 'new-password123',
                'password_confirmation' => 'new-password123',
            ]);

        $response->assertSessionHasNoErrors();
        $response->assertRedirect('/profile');
        
        // Verify the password was actually updated
        $this->assertTrue(Hash::check('new-password123', $user->fresh()->password));
        $this->assertFalse(Hash::check('old-password', $user->fresh()->password));
    }

    public function test_password_confirmation_must_match_exactly(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('current-password'),
        ]);

        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->put('/password', [
                'current_password' => 'current-password',
                'password' => 'new-password123',
                'password_confirmation' => 'new-password124', // Slightly different
            ]);

        $response->assertSessionHasErrors('password');
        $response->assertRedirect('/profile');
        
        // Verify password wasn't changed
        $this->assertTrue(Hash::check('current-password', $user->fresh()->password));
    }

    public function test_password_and_confirmation_must_match_user_scenario(): void
    {
        $user = User::factory()->create([
            'password' => Hash::make('12345678'),
        ]);

        $response = $this
            ->actingAs($user)
            ->from('/profile')
            ->put('/password', [
                'current_password' => '12345678',
                'password' => '12345678',        // New password
                'password_confirmation' => 'msahil123'  // Different confirmation
            ]);

        $response->assertSessionHasErrors('password');
        $response->assertRedirect('/profile');
        
        // Verify password wasn't changed
        $this->assertTrue(Hash::check('12345678', $user->fresh()->password));
    }
}
