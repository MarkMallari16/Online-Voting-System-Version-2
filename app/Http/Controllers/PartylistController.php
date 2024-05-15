<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use Illuminate\Http\Request;
use App\Models\Partylist;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PartylistController extends Controller
{

    public function index()
    {
        $partylists = Partylist::all();
        $partylistsPerPage = Partylist::paginate(5);

        $voters = User::where('role', 'voter')->get();

        return Inertia::render('Moderator/ModeratorPages/Partylist', [
            'partylists' => $partylists,
            'partylistsPerPage' => $partylistsPerPage,
            'voters' => $voters
        ]);
    }
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|max:18',
            'description' => 'required|max:255',
            'partylist_logo' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ], [
            'name.required' => 'Partylist name field is required',
            'description.required' => 'Partylist description field is required'
        ]);

        $path = null;

        if ($request->hasFile('partylist_logo')) {

            $partylist_logo = $request->file('partylist_logo');
            $path = $partylist_logo->storeAs('partylist_logos', $partylist_logo->hashName(), 'public');
        } else {
            $path = null;
        }
        $partylist = Partylist::create([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'partylist_logo' => $path
        ]);
        $user = Auth::user();
        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'User Created',
            'details' => 'User created with name: ' . $user->name,
        ]);

        return redirect()->back()->with('success', 'partylist added successfully');
    }

    public function update(Request $request,  $id)
    {
        $partylist = Partylist::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|max:18',
            'description' => 'max:255',
            'partylist_logo' => 'nullable|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $partylist->name = $validatedData['name'];
        $partylist->description = $validatedData['description'];

        // Check if new logo is uploaded
        if ($request->hasFile('partylist_logo')) {
            // Delete old logo if exists
            if ($partylist->partylist_logo) {
                Storage::delete($partylist->partylist_logo);
            }
            // Upload new logo
            $partylist_logo = $request->file('partylist_logo');
            $path = $partylist_logo->storeAs('partylist_logos', $partylist_logo->hashName(), 'public');

            // Save new logo path
            $partylist->partylist_logo = $path;
        }

        $partylist->save();

        return redirect()->back()->with('success', 'partylist updated successfully');
    }

    public function destroy($id)
    {
        $partylist = Partylist::findOrFail($id);

        $partylist->delete();


        return redirect()->back()->with('success', 'partylist deleted successfully');
    }
    public function assignEditor(Request $request, $partylistId)
    {
        $validatedData = $request->validate([
            'editor_id' => 'required|exists:users,id'
        ]);
        $partylist = Partylist::findOrFail($partylistId);
        $editor = User::findOrFail($validatedData['editor_id']);

        $partylist->editor_id = $editor->id;
        $partylist->save();
    }
}
