<?php

namespace App\Http\Controllers;

use App\Models\Candidate;
use App\Models\Election;
use App\Models\Partylist;
use App\Models\Positions;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BallotController extends Controller
{
    public function displayBallot(){
        $candidatesPerPositions = Candidate::with('position', 'partylist')->get();
        $positionList = Positions::all();
        $election = Election::where('status', 'Active')->latest('start_date')->first();


        return Inertia::render('Moderator/ModeratorPages/Ballots',[
            'candidatesPerPosition' => $candidatesPerPositions,
            'positionList' =>  $positionList,
            'election' => $election
        ]);
    }
}
