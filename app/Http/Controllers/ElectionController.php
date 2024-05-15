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

        $request->validate([
            'title' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ], [
            'end_date.after_or_equal' => 'The end date must be after or equal to the start date.',
        ]);

        $existingElection = Election::latest()->first();

        try {
            if ($existingElection) {
                $existingElection->update([
                    'title' => $request->title,
                    'start_date' => $request->start_date,
                    'end_date' => $request->end_date,
                ]);

                return redirect()->back()->with('success', 'Election updated successfully.');
            } else {
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
        $election = Election::first();

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
}
