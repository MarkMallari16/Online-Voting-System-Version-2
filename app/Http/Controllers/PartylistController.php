<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Partylist;
use App\Models\PartylistEditor;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PartylistController extends Controller
{
    // public function index()
    // {
    //     $partylists = Partylist::all();
    //     $partylistsPerPage = Partylist::paginate(5);
    //     return Inertia::render('Partylist_Editor/PartylistEditorPages/Partylist', [
    //         'partylists' => $partylists,
    //         'partylistsPerPage' => $partylistsPerPage
    //     ]);
    // }
    public function index()
    {
        $partylists = Partylist::all();
        $partylistsPerPage = Partylist::paginate(5);
        return Inertia::render('Moderator/ModeratorPages/Partylist', [
            'partylists' => $partylists,
            'partylistsPerPage' => $partylistsPerPage
        ]);
    }
    public function partylistsEditorIndex()
    {
        $partylists = Partylist::all();
        $partylistsPerPage = Partylist::paginate(5);
        return Inertia::render('Partylist_Editor/PartylistEditorPages/Partylist', [
            'partylists' => $partylists,
            'partylistsPerPage' => $partylistsPerPage
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $partylist = Partylist::create([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return redirect()->back();
    }

    public function update(Request $request,  $id)
    {
        $partylist = Partylist::findOrFail($id);

        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $partylist->update($request->all());

        return redirect()->back()->with('success', 'partylist updated successfully');
    }

    public function destroy($id)
    {
        $partylist = Partylist::findOrFail($id);

        $partylist->delete();


        return redirect()->back()->with('success', 'partylist deleted successfully');
    }

    // public function assignEditor(Request $request, $partylistId, $userId)
    // {
    //     $partylist = Partylist::findOrFail($partylistId);

    //     if (Auth::user()->role !== 'voter') {
    //         return redirect()->back()->with('error', 'Only voters can be assigned as partylist editors.');
    //     }

    //     $user = User::findOrFail($userId);


    //     $user->save();
    //     return redirect()->back()->with('success','Partylist editor assigned successfully');
    // }
    public function assignEditor()
    {
        // Get all users with role 'voter'
        $voterUsers = User::where('role', 'voter')->get();

        foreach ($voterUsers as $user) {
            // Check if the user exists in partylist_editors table
            $editor = PartylistEditor::where('user_id', $user->id)->first();

            // If user exists in partylist_editors table, change their role to 'partylist_editor'
            if ($editor) {
                $user->role = 'partylist_editor';
                $user->save();
            }
        }

        // Redirect back to the previous page with a success message
        return redirect()->back()->with('success', 'Roles assigned successfully');
    }
}
