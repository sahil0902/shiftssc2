<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Department;
use App\Models\Organization;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        // Get the first organization for testing purposes
        // In production, this would be determined by the domain/subdomain
        $organization = Organization::first();
        
        if (!$organization) {
            throw new \Exception('No organization found. Please seed the database first.');
        }
        
        return Inertia::render('Auth/Register', [
            'departments' => Department::where('organization_id', $organization->id)->get(),
            'organization' => $organization
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'department_id' => 'required|exists:departments,id',
        ]);

        $department = Department::findOrFail($request->department_id);
        $organization = $department->organization;

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'department_id' => $request->department_id,
            'organization_id' => $organization->id,
        ]);

        $roleName = 'employee-' . $organization->id;
        $user->assignRole($roleName);

        Auth::login($user);

        event(new Registered($user));

        return redirect()->route('dashboard')->with('success', 'Registration successful! Welcome to ShiftsSync.');
    }
}
