<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
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
        $latestElection = Election::whereIn('status', ['Active', 'Inactive'])->latest('start_date')->first();
        $electionWithCandidatesAndVotes = Election::withTrashed()->with('candidates', 'votes')->paginate(20);


        return Inertia::render(
            'Moderator/ModeratorPages/Election',
            [
                'electionPerPage' => $election,
                'election' => $latestElection,
                'electionWithCandidatesAndVotes' => $electionWithCandidatesAndVotes
            ]
        );
    }
    public function store(Request $request)
    {

        $validatedData = $request->validate([
            'title' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
        ], [
            // 'start_date.after_or_equal' => 'The start date must be today or in the future.',
            'end_date.after_or_equal' => 'The end date must be after or equal to the start date.',
        ]);
        try {

            $existingElection = Election::latest()->first();



            if ($existingElection) {
                $existingElection->update($validatedData);
            }

            Election::where('end_date', '<', now())->where('status', '!=', 'Completed')->update(['status' => 'Completed']);

            $newElectionData = [
                'title' => 'New Election',
                'start_date' => now(),
                'end_date' => now()->addDays(1),
                'status' => 'Inactive'
            ];

            if ($existingElection && $existingElection->end_date < now()) {

                Election::create($newElectionData);

                $existingElection->candidates()->delete();


                $existingElection->votes()->delete();


                $existingElection->delete();
            }
            return redirect()->back()->with('success', 'Election updated/created successfully.');
        } catch (\Exception $e) {

            return redirect()->back()->with('error', 'Failed to update/create election. Please try again.');
        }
    }


    public function activate()
    {

        $election = Election::latest()->first();

        try {

            if (!$election) {
                return redirect()->back()->with('error', 'No election found to activate.');
            }

            Election::where('status', 'Active')->update(['status' => 'Inactive']);


            if ($election->candidates()->count() === 0) {
                return redirect()->back()->withErrors(['error' => 'You must create candidates first!']);
            }

            $election->status = 'Active';
            $election->save();
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to activate election. Please try again.');
        }
    }


    public function deactivate()
    {

        $election = Election::latest()->first();

        if ($election) {

            $election->update(['status' => 'Inactive']);

            return redirect()->back()->with('success', 'Election deactivated successfully.');
        } else {
            return redirect()->back()->with('error', 'Error! Cannot deactivate election!');
        }
    }

    public function stop()
    {
        $election = Election::latest()->first();

        if ($election) {
            $election->update([

                'end_date' => now()

            ]);

            return redirect()->back()->with('success', 'Election stopped successfully.');
        } else {
            return redirect()->back()->with('error', 'Error! Cannot stop election!');
        }
    }
}
