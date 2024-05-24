<?php

namespace App\Http\Controllers;

use App\Models\AuditLog;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AdminVerifyUserController extends Controller
{
    public function index()
    {
        $unverifiedUsers = User::whereNull('email_verified_at')->paginate(10);

        return Inertia::render('Admin/Pages/AdminUserVerification', [
            'unverifiedUsers' => $unverifiedUsers
        ]);
    }
    public function verifyAccount(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);
            $user->email_verified_at = now();
            $user->save();


            AuditLog::create([
                'user_id' => $request->user()->id,
                'action' => 'Verified',
                'details' => 'User account verified: ' . $user->name,
            ]);
        } catch (Exception $e) {
            Log::error('Error creating user: ' . $e->getMessage());
        }
    }
    public function rejectAccount(Request $request, $id)
    {
        try {
            $user = User::findOrFail($id);
            $user->delete();

            AuditLog::create([
                'user_id' => $request->user()->id,
                'action' => 'Rejected',
                'details' => 'User account rejected: ' . $user->name,
            ]);
        } catch (Exception $e) {
            Log::error('Error creating user: ' . $e->getMessage());
        }
    }
}
