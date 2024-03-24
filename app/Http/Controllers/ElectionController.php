<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Election;


use App\Notifications\ElectionDeactivated;
use App\Notifications\ElectionActivated;

use Illuminate\Support\Facades\Notification;
use Inertia\Inertia;

class ElectionController extends Controller
{
 
    public function store(Request $request)
    {
        // Check if there is an existing election
        
        // Validate the request data
        $request->validate([
            'title' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
        ]);

        $existingElection = Election::first();


        // If there is an existing election, update it; otherwise, create a new one
        if ($existingElection) {
            $existingElection->update([
                'title' => $request->title,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ]);

            return redirect()->back()->with('success', 'Election updated successfully.');
        } else {
            // Create a new election
            $election = Election::create([
                'title' => $request->title,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
            ]);

            return redirect()->back()->with('success', 'Election created successfully.');
        }
    }

    public function activate()
    {
        // Retrieve the first (and only) election
        $election = Election::first();

        if ($election) {
            // Deactivate any currently activated election
            Election::where('status', 'Active')->update(['status' => 'Inactive']);
    
            // Activate the retrieved election
            $election->status = 'Active';
            $election->save();
    
            return redirect()->back()->with('success', 'Election activated successfully.');
        } else {
            return redirect()->back()->with('success', 'Election activated successfully.');
        }
    }

    public function deactivate()
    {
        // Retrieve the first (and only) election
        $election = Election::first();

        if ($election) {
            // Deactivate the election
            $election->status = 'Inactive';
            $election->save();
           
            
            return redirect()->back()->with('success', 'Election deactivated successfully.');

        } else {
            return redirect()->back()->with('success', 'Election deactivated successfully.');
        }
    }
}
