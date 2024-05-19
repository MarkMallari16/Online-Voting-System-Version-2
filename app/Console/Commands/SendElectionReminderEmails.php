<?php

namespace App\Console\Commands;

use App\Models\Election;
use App\Models\User;
use App\Notifications\ElectionReminder;
use Illuminate\Console\Command;

class SendElectionReminderEmails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:send-election-reminder-emails';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $voters = User::where('role','voter')->get();
        $latestElection = Election::latest()->first();

        if ($latestElection && $latestElection->status === 'Active'){
            foreach ($voters as $voter)
            {
                $voter->notify(new ElectionReminder());
            }
        }
        $this->info('Reminder emails sent to all voters.');
    }
}
