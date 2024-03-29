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

        if ($request->file('image')->isValid()) {
            $candidateProfile = time() . '.' . $request->candidateProfile->extension();
            $request->candidateProfile->storeAs('public/images', $candidateProfile);

            return $candidateProfile;
        }

        return null;
    }
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'first_name' => 'required|string',
                'middle_name' => 'required|string',
                'last_name' => 'required|string',
                'partylist' => 'required|string',
                'position' => 'required|string',
                'manifesto' => 'required|string', // Change 'text' to 'string'
                'candidate_profile' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            ]);

            $candidateImagePath = null;

            if ($request->hasFile('candidate_profile')) {
                $candidateImagePath = $request->file('candidate_profile')->store('candidate_profiles', 'public');
            }

            $candidate = Candidate::create([
                'first_name' => $validatedData['first_name'],
                'middle_name' => $validatedData['middle_name'],
                'last_name' => $validatedData['last_name'],
                'partylist' => $validatedData['partylist'],
                'position' => $validatedData['position'],
                'manifesto' => $validatedData['manifesto'],
                'candidate_profile' => $candidateImagePath,
            ]);

            return redirect()->back()->with('success', 'Candidate added successfully');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to create candidate');
        }
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
            return redirect()->back()->with('success', 'Candidate deleted successfully');
        } catch (\Exception $e) {
            // Redirect back with error message
            return redirect()->back()->with('error', 'Failed to delete candidate');
        }
    }
}
