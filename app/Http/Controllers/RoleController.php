<?php

namespace App\Http\Controllers;

use App\Models\PartylistEditor;
use App\Models\User;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function switchRole(Request $request, $userId)
    {
        // Find the user by ID
        $user = User::findOrFail($userId);

        // Check if the user is currently a voter
        if ($user->role === 'voter') {
            // Check if the user exists in partylist_editors table
            $editor = PartylistEditor::where('user_id', $user->id)->first();

            // If user exists in partylist_editors table, change their role to 'partylist_editor'
            if ($editor) {
                $user->role = 'partylist_editor';
                $user->save();
                return redirect()->back()->with('success', 'User role switched to partylist_editor');
            } else {
                return redirect()->back()->with('error', 'User is not assigned as a partylist editor');
            }
        } elseif ($user->role === 'partylist_editor') {
            // If the user is already a partylist editor, switch their role back to 'voter'
            $user->role = 'voter';
            $user->save();
            return redirect()->back()->with('success', 'User role switched to voter');
        } else {
            return redirect()->back()->with('error', 'User role cannot be switched');
        }
    }
}
