<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\UserController;
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
    Route::get('/partylist', function () {
        //render
        return Inertia::render('Moderator/ModeratorPages/Partylist');
    })->name('partylist');

    Route::get('/election', function () {
        return Inertia::render('Moderator/ModeratorPages/Election');
    })->name('election');

    Route::get('/votes', function () {
        return Inertia::render('Moderator/ModeratorPages/Votes');
    })->name('votes');

    Route::get('/positions', function () {
        return Inertia::render('Moderator/ModeratorPages/Positions');
    })->name('positions');

    Route::get('/candidate', function () {
        return Inertia::render('Moderator/ModeratorPages/Candidate');
    })->name('candidate');

    Route::get('/live-result', function () {
        return Inertia::render('Moderator/ModeratorPages/LiveResult');
    })->name('live-result');

  
});
Route::middleware(['auth', 'verified', 'moderator'])->group(function () {
    Route::post('/elections', [ElectionController::class, 'store']);
});
Route::middleware(['auth', 'verified', 'moderator'])->group(function () {
    // Retrieve all partylists
    Route::get('/partylists', [PartylistController::class, 'index']);

    // Create a new partylist
    Route::post('/partylists', [PartylistController::class, 'store']);

    // Update an existing partylist
    Route::put('/partylists/{partylist}', [PartylistController::class, 'update']);

    // Delete a partylist
    Route::delete('/partylists/{partylist}', [PartylistController::class, 'destroy']);
});
Route::middleware(['auth', 'verified', 'moderator'])->group(function () {
  

    Route::post('/positions', [PositionController::class, 'store']);
    Route::put('/positions/{id}', [PositionController::class, 'update']);
    Route::delete('/positions/{id}', [PositionController::class, 'destroy']);
});
//render
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

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
