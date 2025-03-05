<?php

namespace App\Http\Controllers;


use App\Models\Candidate;
use App\Models\Partylist;
use App\Models\Positions;
use App\Models\Election;
use App\Models\User;
use App\Models\Vote;
use App\Services\DashboardService;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    protected $dashboardService;

    public function __construct(DashboardService $dashboardService)
    {
        $this->dashboardService = $dashboardService;
    }
    public function dashboard()
    {
        $user = Auth::user();

        $data = $this->dashboardService->getDashboardData($user);

        return Inertia::render('Dashboard', $data);
    }
}