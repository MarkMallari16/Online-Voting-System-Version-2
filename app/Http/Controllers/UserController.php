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

    // public function index(Request $request)
    // {
    //     $perPage = $request->input('perPage', 10);
    //     $users = User::paginate($perPage);

    //     return Inertia::render('Dashboard', [
    //         'users' => $users
    //     ]);
    // }
    public function store(CreateUserRequest $request)
    {

        $validatedData = $request->validated();
        $validatedData['profile_picture'] = 'profile_photos/default_profile.png';

        // Create the user
        $user = User::create($validatedData);

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'User Created',
            'details' => 'User created with name: ' . $user->name,
        ]);



        return redirect()->back()->with('success', 'User created successfully');
    }

    public function update(UpdateUserRequest $request, $id)
    {
        $request->validated();

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
            'user_id' => $request->user()->id,
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
            'details' => 'Deleted user with ID and Name: ' . $user->id . " " . $user->name,
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
    public function displayActivityLogs()
    {
        $query = AuditLog::query();
        $logs = $query->with('user')->orderByDesc('created_at')->paginate(15);

        return Inertia::render('Admin/Pages/ActivityLog', [
            'logs' => $logs
        ]);
    }
}
