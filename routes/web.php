<?php

use App\Http\Controllers\CandidateController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;

use App\Models\Election;
use App\Http\Controllers\ProfilePictureController;
use App\Http\Controllers\ElectionController;
use App\Http\Controllers\PartylistController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\VoteController;
use App\Http\Controllers\VoterController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

//for admin page 

Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    //retrieved data and display in table
    Route::get('/activitylog', function () {
        return Inertia::render('Admin/Pages/ActivityLog');
    })->name('activitylog');
    //add users
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    // Update user (process form submission)
    Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
    // Delete user
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    //getting activity logs
    Route::get('/activity-logs', [UserController::class, 'getActivityLogs'])->name('activity.logs');
});


//for moderator page

Route::middleware(['auth', 'verified', 'moderator'])->group(function () {
    Route::get('/election', function () {
        $election = Election::where('status', 'Active')->latest('start_date')->first();

        return Inertia::render('Moderator/ModeratorPages/Election', [
            'election' => $election
        ]);
    })->name('election');

    Route::get('/ballots', function () {
        return Inertia::render('Moderator/ModeratorPages/Ballots');
    })->name('ballots');

    Route::get('/live-result', function () {
        return Inertia::render('Moderator/ModeratorPages/LiveResult');
    })->name('live-result');


    Route::post('/election', [ElectionController::class, 'store']);
    Route::put('/election/activate', [ElectionController::class, 'activate']);
    Route::put('/election/deactivate', [ElectionController::class, 'deactivate']);

    Route::get('/candidate', [CandidateController::class, 'index'])->name('candidate');
    Route::post('/candidate', [CandidateController::class, 'store'])->name('candidate.store');
    Route::put('/candidate/{id}', [CandidateController::class, 'update'])->name('candidate.update');
    Route::delete('/candidate/{id}', [CandidateController::class, 'destroy'])->name('candidate.destroy');


    Route::get('/positions', [PositionController::class, 'index'])->name('positions');
    Route::post('/positions', [PositionController::class, 'store'])->name('positions.store');
    Route::put('/positions/{id}', [PositionController::class, 'update'])->name('positions.update');
    Route::delete('/positions/{id}', [PositionController::class, 'destroy'])->name('positions.destroy');

    Route::get('/votes', [VoteController::class, 'index'])->name('votes');
    Route::post('/hasVoted', [CandidateController::class, 'hasVoted'])->name('vote.hasVoted');

});


Route::middleware(['auth', 'verified', 'partylist_editor'])->group(function () {
    Route::get('/partylists', [PartylistController::class, 'index'])->name('partylists');

    // Create a new partylist
    Route::post('/partylists', [PartylistController::class, 'store']);

    // Update an existing partylist
    Route::put('/partylists/{id}', [PartylistController::class, 'update']);

    // Delete a partylist
    Route::delete('/partylists/{id}', [PartylistController::class, 'destroy']);
});

//render
Route::get('/dashboard', [CandidateController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/moderator-overview', [CandidateController::class, 'moderatorOverview'])->middleware(['auth', 'verified', 'moderator']);


Route::middleware(['auth', 'verified'])->group(function () {
    Route::post('/votes', [VoteController::class, 'createVote'])->name('votes.create');
    Route::get('/casted-votes',[VoteController::class,'castedVotes'])->name('casted.votes');
    //upload Profile picture
    Route::post('/upload-profile-picture', [ProfilePictureController::class, 'uploadProfile'])->name('profile.uploadProfile');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    //get user
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
});
require __DIR__ . '/auth.php';
