<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\Election;
use App\Models\User;
use App\Notifications\ElectionDeactivated;
use App\Notifications\ElectionActivated;
use App\Notifications\ElectionEnded;
// use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Notification;
use App\Notifications\ElectionEndingSoon;

class ElectionController extends Controller
{

    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'title' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ], [
            'end_date.after_or_equal' => 'The end date must be after or equal to the start date.',
        ]);

        $previousElection = Election::latest()->first();
        try {

            $existingElection = Election::latest()->first();

            if ($existingElection) {

                $existingElection->update([
                    'title' => $request->title,
                    'start_date' => $request->start_date,
                    'end_date' => $request->end_date,
                ]);
            } else if ($existingElection && $existingElection->end_date < now()) {
                // Create a new election
                Election::create([
                    'title' => $request->title,
                    'start_date' => now(),
                    'end_date' => now()->addDays(1),
                    'status' => 'Inactive', // Set the status of the new election to 'Active'
                ]);
            }

            // Check if the existing election has ended
            if ($existingElection && $existingElection->end_date < now()) {
                if ($previousElection && $previousElection->status !== 'Archived') {
                    // Archive the previous election if it's not already archived
                    $previousElection->update(['status' => 'Archived']);
                }
                // Create a new election
                Election::create([
                    'title' => $validatedData['title'],
                    'start_date' => $validatedData['start_date'],
                    'end_date' => $validatedData['end_date'], // Set the end date to 1 day from now
                    'status' => 'Inactive'
                ]);
            }

            return redirect()->back()->with('success', 'Election updated/created successfully.');
        } catch (\Exception $e) {
            // Handle any errors
            return redirect()->back()->with('error', 'Failed to update/create election. Please try again.');
        }
    }


    public function activate()
    {
        // Retrieve the first (and only) election
        $election = Election::latest()->first();

        try {
            if ($election) {
                // Deactivate any currently activated election
                Election::where('status', 'Active')->update(['status' => 'Inactive']);
            }

            // If there is no existing election, create a new one
            else {
                $election = Election::create([
                    // Add default values for the new election here
                    'title' => 'Default',
                    'start_date' => now(),
                    'end_date' => now()->addDays(1), // Set the end date to 1 day from now
                    'status' => 'Active'
                ]);
            }
            // Activate the retrieved or newly created election
            $election->status = 'Active';
            $election->save();

            // Get all users
            $users = User::where('role', 'voter')->get();

            // Send email notification for election activation to all users
            // foreach ($users as $user) {
            //     $user->notify(new ElectionActivated());
            // }

            return redirect()->back()->with('success', 'Election activated successfully.');
        } catch (\Exception $e) {
            // Handle any errors that occur during the activation process
            return redirect()->back()->with('error', 'Failed to activate election. Please try again.');
        }
    }

    public function deactivate()
    {
        // Retrieve the first (and only) election
        $election = Election::latest();

        if ($election) {
            // Deactivate the election
            $election->status = 'Inactive';
            $election->save();

            // Get all users
            $users = User::where('role', 'voter')->get();

            // Send email notification for election deactivation to all users
            // foreach ($users as $user) {
            //     $user->notify(new ElectionDeactivated());
            // }
            return redirect()->back()->with('success', 'Election deactivated successfully.');
        } else {
            return redirect()->back()->with('success', 'Election deactivated successfully.');
        }
    }
    public function archiveElection($id)
    {
        $election = Election::findOrFail($id);

        $election->update(['status' => 'archived']);
    }
}
