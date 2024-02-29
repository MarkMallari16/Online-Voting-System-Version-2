<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Partylist;

class PartylistController extends Controller
{
    public function index()
    {
        $partylists = Partylist::all();
        return response()->json($partylists);
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

        return response()->json($partylist, 201);
    }

    public function update(Request $request, Partylist $partylist)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
        ]);

        $partylist->update([
            'name' => $request->name,
            'description' => $request->description,
        ]);

        return response()->json($partylist, 200);
    }

    public function destroy(Partylist $partylist)
    {
        $partylist->delete();
        return response()->json(['message' => 'Partylist deleted successfully']);
    }
}
