<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();
        
        // Log the role check
        \Log::info('Role check:', [
            'user_id' => $user->id,
            'user_role' => $user->role,
            'required_role' => $role
        ]);

        if ($user->role !== $role) {
            if ($request->inertia()) {
                return redirect()->back()->with('error', 'You do not have permission to access this resource.');
            }
            abort(403, 'Unauthorized action.');
        }

        return $next($request);
    }
} 