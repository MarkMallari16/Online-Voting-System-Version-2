<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Partylist;
use App\Models\Positions;
use App\Models\Election;
use App\Models\User;

use Inertia\Inertia;
use Illuminate\Http\Request;

class CandidateController extends Controller
{
    function moderatorOverview()
    {
        $positions = Positions::all();
        $partylist = Partylist::all();
        $candidate = Candidate::all();

        return Inertia::render('Moderator/ModeratorOverview', [
            'candidate' => $candidate
        ]);
    }
    function dashboard()
    {
        $positions = Positions::all();
        $partylist = Partylist::all();
        $candidate = Candidate::all();
        // Retrieve the latest election, whether active or inactive
        $election = Election::where('status', 'Active')
            ->orWhere('status', 'Inactive')
            ->latest('start_date')
            ->first();
        $voters = User::where('role', 'voter')->get();

        return Inertia::render('Dashboard', [
            'partylist_list' => $partylist,
            'position_list' => $positions,
            'candidates' => $candidate,
            'election' => $election,
            'voters' => $voters
        ]);
    }
    public function index()
    {
        // Retrieve all candidates
        $positions = Positions::all();
        $partylist = Partylist::all();
        $candidate = Candidate::all();

        return Inertia::render('Moderator/ModeratorPages/Candidate', [
            'partylist_list' => $partylist,
            'position_list' => $positions,
            'candidates' => $candidate
        ]);
    }
    // public function store(Request $request)
    // {
    //     try {
    //         $validatedData = $request->validate([
    //             'candidate_profile' => 'nullable|string',
    //             'first_name' => 'required|string',
    //             'middle_name' => 'nullable|string',
    //             'last_name' => 'required|string',
    //             'partylist' => 'required|string',
    //             'position' => 'required|string',
    //             'manifesto' => 'required|string'
    //         ]);

    //         $candidate = Candidate::create($validatedData);

    //         // Redirect to the candidate index page upon successful creation
    //         return redirect()->back()->with('success', 'Candidate created successfully');
    //     } catch (\Exception $e) {
    //         // Log the exception for debugging
    //         // Log::error('Failed to create candidate: ' . $e->getMessage());

    //         // Redirect back with an error message
    //         return redirect()->back()->with('error', 'Failed to create candidate');
    //     }
    // }
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'first_name' => 'required|string',
                'middle_name' => 'nullable|string',
                'last_name' => 'required|string',
                'partylist' => 'required|string',
                'position' => 'required|string',
                'manifesto' => 'required|string',
                'candidate_profile' => 'nullable|string',
            ]);

            // Retrieve the Partylist and Position IDs based on their names
            $partylist = Partylist::where('name', $validatedData['partylist'])->firstOrFail();
            $position = Positions::where('name', $validatedData['position'])->firstOrFail();

            // Create the candidate with the validated data and related IDs
            $candidate = Candidate::create([
                'first_name' => $validatedData['first_name'],
                'middle_name' => $validatedData['middle_name'],
                'last_name' => $validatedData['last_name'],
                'partylist_id' => $partylist->id,
                'position_id' => $position->id,
                'manifesto' => $validatedData['manifesto'],
                'candidate_profile' => $validatedData['candidate_profile'],
            ]);

            // Redirect to the candidate index page upon successful creation
            return redirect()->back()->with('success', 'Candidate created successfully');
        } catch (\Exception $e) {
            // Redirect back with an error message
            return redirect()->back()->with('error', 'Failed to create candidate');
        }
    }

    public function update(Request $request, Candidate $candidate)
    {
        // Validate the incoming request data
        try {
            $validatedData = $request->validate([
                'first_name' => 'required|string',
                'last_name' => 'required|string',
                'partylist_id' => 'required|exists:partylists,id',
                'position_id' => 'required|exists:positions,id',
                'position' => 'required|string',
                'manifesto' => 'required|string',
                'candidate_profile' => 'nullable|string',
            ]);

            // Update the candidate
            $candidate->update([
                'first_name' => $validatedData['first_name'],
                'last_name' => $validatedData['last_name'],
                'partylist_id' => $validatedData['partylist_id'],
                'position_id' => $validatedData['position_id'],
                'position' => $validatedData['position'],
                'manifesto' => $validatedData['manifesto'],
                'candidate_profile' => $validatedData['candidate_profile'],
            ]);

            // Redirect back with success message
            return redirect()->back()->with('success', 'Candidate updated successfully');
        } catch (\Exception $e) {
            // Redirect back with error message
            return redirect()->back()->with('error', 'Failed to update candidate');
        }
    }

    public function destroy(Candidate $candidate)
    {
        try {
            // Delete the candidate
            $candidate->delete();

            // Redirect back with success message
            return redirect()->back()->with('success', 'Candidate deleted successfully');
        } catch (\Exception $e) {
            // Redirect back with error message
            return redirect()->back()->with('error', 'Failed to delete candidate');
        }
    }
}
