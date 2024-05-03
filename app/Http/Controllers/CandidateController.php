<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Election;
use App\Models\Partylist;
use App\Models\Positions;

use Inertia\Inertia;
use Illuminate\Http\Request;



class CandidateController extends Controller
{

    public function index()
    {
        // Retrieve all candidates
        $positions = Positions::all();
        $partylist = Partylist::all();
        $candidate = Candidate::all();
        $candidatesPerPage = Candidate::paginate(10);

        return Inertia::render('Moderator/ModeratorPages/Candidate', [
            'partylist_list' => $partylist,
            'position_list' => $positions,
            'candidates' => $candidate,
            'candidatesPerPage' => $candidatesPerPage
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
        $election = Election::latest()->first();
        
        if(!$election){
            return redirect()->back();
        }

        $validatedData = $request->validate(
            [
                'first_name' => 'required|alpha',
                'middle_name' => 'nullable|string',
                'last_name' => 'required|alpha',
                'manifesto' => 'required|string',
                'candidate_profile' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'partylist_id' => 'required|exists:partylists,id',
                'position_id' => 'required|exists:positions,id',
            ],
            [
                'partylist_id.required' => 'The partylist field is required',
                'position_id.required' =>  'The position field is required'
            ]
        );

        $middleName = $validatedData['middle_name'] ?? null;
        $candidateImagePath = null;

        if ($request->hasFile('candidate_profile')) {
            $candidateImagePath = $this->uploadImage($request);
        }

        Candidate::create([
            'first_name' => $validatedData['first_name'],
            'middle_name' => $middleName,
            'last_name' => $validatedData['last_name'],
            'manifesto' => $validatedData['manifesto'],
            'candidate_profile' => $candidateImagePath,
            'partylist_id' => $validatedData['partylist_id'],
            'position_id' => $validatedData['position_id'],
            'election_id' => $election->id
        ]);


        return redirect()->back()->with('success', 'Candidate added successfully');
    }

    public function update(Request $request, $id)
    {
        $election = Election::latest()->first();

        $candidate = Candidate::findOrFail($id);

        $validatedData = $request->validate([
            // 'candidate_profile' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'first_name' => 'required|alpha',
            'middle_name' => 'nullable|string',
            'last_name' => 'required|alpha',
            'manifesto' => 'required|string',
            // 'candidate_profile' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'partylist_id' => 'required|exists:partylists,id',
            'position_id' => 'required|exists:positions,id',

        ]);

        $middleName = $validatedData['middle_name'] ?? null;

        $candidateImagePath = $candidate->candidate_profile;

        if ($request->hasFile('candidate_profile')) {
            // Upload and save the new profile image with a new filename
            $candidateImagePath = $this->uploadImage($request);
        }


        // Update candidate data
        $candidate->update([
            'first_name' => $validatedData['first_name'],
            'middle_name' => $middleName,
            'last_name' => $validatedData['last_name'],
            'manifesto' => $validatedData['manifesto'],
            'partylist_id' => $validatedData['partylist_id'],
            'position_id' => $validatedData['position_id'],
            'candidate_profile' => $candidateImagePath,
            'election_id' => $election->id
        ]);

        return redirect()->back()->with('success', 'Candidate updated successfully');
    }

    public function destroy(Candidate $candidate)
    {
        $candidate->delete();
    }
}
