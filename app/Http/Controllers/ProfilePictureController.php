<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;

class ProfilePictureController extends Controller
{
    public function uploadProfile(Request $request)
    {
        // Validate the request
        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // Get the uploaded file
        $profilePicture = $request->file('profile_picture');

        // Generate a unique filename
        $imageName = time() . '.' . $profilePicture->hashName();

        // Move the uploaded file to the desired location
        $profilePicture->storeAs('profile_photos', $imageName, 'public');

        // Get the authenticated user
        $user = Auth::user();

        // Update the user's profile picture path in the database
        $user->profile_picture = 'profile_photos/' . $imageName;
        $user->save();

        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'Updated',
            'details' => 'User with ID: ' . $user->id . ' uploaded a new profile picture.',
        ]); 
        return Redirect::route('profile.edit');
    }
}
