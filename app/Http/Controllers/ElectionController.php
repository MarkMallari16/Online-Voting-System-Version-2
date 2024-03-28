<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Election;
use App\Models\User;
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
            'title' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ], [
            'end_date.after_or_equal' => 'The end date must be after or equal to the start date.',
        ]);

        $existingElection = Election::first();


        // If there is an existing election, update ielet; otherwise, create a new one
        try {
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
        } catch (\Exception $e) {
            // Handle the error, you might want to log the error or return a response with an error message
            return redirect()->back()->with('error', 'Failed to create/update election. Please try again.');
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
            // Get all users
            $users = User::where('role', 'voter')->get();

            // Send email notification for election activation to all users
            foreach ($users as $user) {
                $user->notify(new ElectionActivated());
            }

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

            // Get all users
            $users = User::where('role', 'voter')->get();

            // Send email notification for election deactivation to all users
            foreach ($users as $user) {
                $user->notify(new ElectionDeactivated());
            }
            return redirect()->back()->with('success', 'Election deactivated successfully.');
        } else {
            return redirect()->back()->with('success', 'Election deactivated successfully.');
        }
    }
}
