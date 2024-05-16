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
use Inertia\Inertia;

class ElectionController extends Controller
{
    public function index()
    {
        $election = Election::orderByDesc('created_at')->paginate(10);
        $lastestElection = Election::where('status', 'Active')->latest('start_date')->first();

        $electionWithCandidatesAndVotes = Election::onlyTrashed()->with('candidates','votes')->paginate(10);

        return Inertia::render(
            'Moderator/ModeratorPages/Election',
            [
                'electionPerPage' => $election,
                'election' => $lastestElection,
                'electionWithCandidatesAndVotes' => $electionWithCandidatesAndVotes
            ]
        );
    }
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'title' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ], [
            // 'start_date.after_or_equal' => 'The start date must be today or in the future.',
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
            } 

            //check if exisitng election is ended
            if ($existingElection && $existingElection->end_date < now()) {
                if ($previousElection && $previousElection->status !== 'Completed') {
                 
                    $previousElection->update(['status' => 'Completed']);
                    $previousElection->delete();
                }
             
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

        $election = Election::latest()->first();

        try {
            if ($election) {
                // Deactivate any currently activated election
                Election::where('status', 'Active')->update(['status' => 'Inactive']);
            } else {
                $election = Election::create([
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
        $election = Election::latest()->first();

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
