<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Partylist;
use App\Models\Positions;
use App\Models\Election;
use App\Models\User;

use Inertia\Inertia;
use Illuminate\Http\Request;

use Auth;
use Illuminate\Validation\ValidationException;
use Redirect;

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

    public function uploadImage(Request $request)
    {
        $request->validate([
            'candidate_profile' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        if ($request->hasFile('candidate_profile')) {
            $candidateProfileName = time() . '.' . $request->file('candidate_profile')->getClientOriginalExtension();

            // Move the file to the public/candidate_profile_photos directory
            $request->file('candidate_profile')->move(public_path('candidate_profile_photos'), $candidateProfileName);

            // Return the path relative to the public directory
            return 'candidate_profile_photos/' . $candidateProfileName;
        }

        // If no file is uploaded, return null
        return null;
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'first_name' => 'required|string',
            'middle_name' => 'required|string',
            'last_name' => 'required|string',
            'manifesto' => 'required|string',
            'candidate_profile' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'partylist_id' => 'required|exists:partylists,id',
            'position_id' => 'required|exists:positions,id'
        ]);

        $candidateImagePath = null;

        if ($request->hasFile('candidate_profile')) {
            $candidateImagePath = $this->uploadImage($request);
        }

        Candidate::create([
            'first_name' => $validatedData['first_name'],
            'middle_name' => $validatedData['middle_name'],
            'last_name' => $validatedData['last_name'],
            'manifesto' => $validatedData['manifesto'],
            'candidate_profile' => $candidateImagePath,
            'partylist_id' => $validatedData['partylist_id'],
            'position_id' => $validatedData['position_id']
        ]);

        return redirect()->back()->with('success', 'Candidate added successfully');
    }




    public function update(Request $request, Candidate $candidate)
    {
    }

    public function destroy($id)
    {
        try {
            // Delete the candidate
            $candidate = Candidate::findOrFail($id);
            $candidate->delete();

            // Redirect back with success message
            return redirect()->back()->with('success', 'Candidate successfully deleted');
        } catch (\Exception $e) {
            // Redirect back with error message
            return redirect()->back()->with('error', 'Failed to delete candidate');
        }
    }
}
