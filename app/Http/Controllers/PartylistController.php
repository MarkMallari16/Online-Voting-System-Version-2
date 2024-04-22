<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Partylist;
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

    public function assignEditor(Request $request, $partylistId, $userId)
    {
        $partylist = Partylist::findOrFail($partylistId);

        if (Auth::user()->role !== 'voter') {
            return redirect()->back()->with('error', 'Only voters can be assigned as partylist editors.');
        }

        $user = User::findOrFail($userId);


        $user->save();
        return redirect()->back()->with('success','Partylist editor assigned successfully');
    }
}
