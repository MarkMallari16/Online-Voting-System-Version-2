<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Partylist;
use Inertia\Inertia;

class PartylistController extends Controller
{
    public function index()
    {
        $partylists = Partylist::all();
        return Inertia::render('Partylist_Editor/PartylistEditorPages/Partylist', [
            'partylists' => $partylists
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
}
