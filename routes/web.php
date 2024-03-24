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
Route::get('/activitylog', function () {
    return Inertia::render('Admin/Pages/ActivityLog');
})->name('activitylog');
//for moderator page
Route::middleware(['auth', 'verified', 'moderator'])->group(function () {
    Route::get('/election', function () {
        $election = Election::where('status', 'Active')->latest('start_date')->first();
        return Inertia::render('Moderator/ModeratorPages/Election', [
            'election' => $election
        ]);
    })->name('election');

    Route::get('/votes', function () {
        return Inertia::render('Moderator/ModeratorPages/Votes');
    })->name('votes');



    Route::get('/ballots', function () {
        return Inertia::render('Moderator/ModeratorPages/Ballots');
    })->name('ballots');

    Route::get('/live-result', function () {
        return Inertia::render('Moderator/ModeratorPages/LiveResult');
    })->name('live-result');
});
Route::middleware(['auth', 'verified', 'moderator'])->group(function () {
    Route::post('/election', [ElectionController::class, 'store']);
    Route::put('/election/activate', [ElectionController::class, 'activate']);
    Route::put('/election/deactivate', [ElectionController::class, 'deactivate']);

    Route::get('/candidate', [CandidateController::class, 'index'])->name('candidate');
    Route::post('/candidate', [CandidateController::class, 'store'])->name('candidate.post');

    Route::get('/positions', [PositionController::class, 'index'])->name('positions');
    Route::post('/positions', [PositionController::class, 'store'])->name('positions.store');
    Route::put('/positions/{id}', [PositionController::class, 'update'])->name('positions.update');
    Route::delete('/positions/{id}', [PositionController::class, 'destroy'])->name('positions.delete');
});


Route::middleware(['auth', 'verified', 'partylist_editor'])->group(function () {
    Route::get('/partylists', [PartylistController::class, 'index'])->name('partylists');

    // Create a new partylist
    Route::post('/partylists', [PartylistController::class, 'store']);

    // Update an existing partylist
    Route::put('/partylists/{partylist}', [PartylistController::class, 'update']);

    // Delete a partylist
    Route::delete('/partylists/{partylist}', [PartylistController::class, 'destroy']);
});

//render
Route::get('/dashboard', [CandidateController::class, 'dashboard'])->middleware(['auth', 'verified'])->name('dashboard');
Route::get('/moderator-overview', [CandidateController::class, 'moderatorOverview'])->middleware(['auth', 'verified']);
Route::middleware('auth')->group(function () {

    //upload Profile picture
    Route::post('/upload-profile-picture', [ProfilePictureController::class, 'uploadProfile'])->name('profile.uploadProfile');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    //get user
    Route::get('/users', [UserController::class, 'index'])->name('users.index');

    //add users
    Route::post('/users', [UserController::class, 'store'])->name('users.store');

    // Update user (process form submission)
    Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
    // Delete user
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    //getting activity logs
    Route::get('/activity-logs', [UserController::class, 'getActivityLogs'])->name('activity.logs');
});

require __DIR__ . '/auth.php';
