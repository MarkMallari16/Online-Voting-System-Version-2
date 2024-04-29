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
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'partylist_logo' => 'image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $partylist = Partylist::create([
            'name' => $request->name,
            'description' => $request->description,
            
        ]);

        return redirect()->back()->with('success','partylist added successfully');
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
}
