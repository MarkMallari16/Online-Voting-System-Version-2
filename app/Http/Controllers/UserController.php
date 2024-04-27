<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Http\Request;

use App\Models\User;
use App\Models\AuditLog;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserController extends Controller
{
    
    public function index(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $users = User::paginate($perPage);

        return response()->json($users);
    }
    public function store(CreateUserRequest $request)
    {
        // Validate request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users|school_email', 
            'password' => 'required|string|min:6|confirmed',
            'role' => 'required|in:admin,moderator,partylist_editor,voter',
        ]);

        $validatedData['profile_picture'] = 'profile_photos/default_profile.png';

        // Create the user
        $user = User::create($validatedData);

        AuditLog::create([
            'user_id' => $request->user()->id, 
            'action' => 'User Created',
            'details' => 'User created with name: ' . $user->name,
        ]);


        // Redirect to the dashboard route
        return redirect()->back()->with('success', 'User created successfully');
    }

    public function update(UpdateUserRequest $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'email',
            'role' => 'in:admin,moderator,voter,partylist_editor',
        ]);

        // Find the user by ID
        $user = User::findOrFail($id);

        // Update user data
        $userData = [
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'role' => $request->input('role'),
        ];

        // Conditionally set the password only if it's provided
        if ($request->filled('password')) {
            $userData['password'] = bcrypt($request->input('password'));
        }

        $user->update($userData);

        AuditLog::create([
            'user_id' => $request->user()->id, // Get the authenticated user's ID
            'action' => 'User Updated',
            'details' => 'User updated with name: ' . $user->name,
        ]);

        return redirect()->back()->with('success', 'User updated successfully');
    }

    public function destroy(Request $request, User $user)
    {
        $authenticatedUser = $request->user();

        AuditLog::create([
            'user_id' => $authenticatedUser->id,
            'action' => 'User Deleted',
            'details' => 'Deleted user with ID: ' . $user->id,
        ]);

        $user->delete();
        return redirect()->back()->with('success', 'User deleted successfully');
    }
    //getting the activity logs
    public function getActivityLogs(Request $request)
    {
        $perPage = $request->input('perPage', 10);
        $logs = AuditLog::with('user')->orderByDesc('created_at')->paginate($perPage);

        return response()->json($logs);
    }
}
