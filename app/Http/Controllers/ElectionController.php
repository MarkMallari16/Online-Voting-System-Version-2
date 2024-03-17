<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Election;

class ElectionController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request data
        $request->validate([
            'title' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        // Create a new election
        $election = Election::create([
            'title' => $request->title,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        return redirect()->back()->with('success', 'Election created successfully.');
    }

    public function update(Request $request, Election $election)
    {
        // Validate the request data
        $request->validate([
            'title' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        // Update the existing election
        $election->update([
            'title' => $request->title,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);

        return redirect()->back()->with('success', 'Election updated successfully.');
    }

    public function activate(Request $request)
    {
        // Assuming you have an 'id' parameter in the request
        $election = Election::find($request->id);
        if ($election) {
            $election->activated = true;
            $election->save();
            return response()->json(['message' => 'Election activated successfully']);
        } else {
            return response()->json(['message' => 'Election not found'], 404);
        }
    }

    public function deactivate(Request $request)
    {
        // Assuming you have an 'id' parameter in the request
        $election = Election::find($request->id);
        if ($election) {
            $election->activated = false;
            $election->save();
            return response()->json(['message' => 'Election deactivated successfully']);
        } else {
            return response()->json(['message' => 'Election not found'], 404);
        }
    }
}
