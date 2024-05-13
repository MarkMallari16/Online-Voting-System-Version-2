import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import AdminDashboard from './Admin/AdminDashboard';
import ModeratorDashboard from './Moderator/ModeratorDashboard';
import VoterDashboard from './Voter/VoterDashboard';
import PartylistEditorDashboard from './Partylist_Editor/PartylistEditorDashboard';

import Countdown from '@/Components/Countdown';

export default function Dashboard({ auth, usersPerPage, candidates, candidatesAll, voterVoted, position_list, partylist_list, election, voters, votersVotedCount, voteCounts, castedVotes, voterHasVoted, latestVotedUsers, totalCandidatesPerPositions, candidateWinners, totalVotesPerPosition, abstainCount }) {

    console.log(candidateWinners);
    const { role } = auth.user;
    let dashboardContent;

    switch (role) {
        case 'admin':
            dashboardContent = <AdminDashboard usersPerPage={usersPerPage} />;
            break;
        case 'moderator':
            dashboardContent = <ModeratorDashboard voters={voters} election={election} candidates={candidates} voteCounts={voteCounts} votersVotedCount={votersVotedCount} latestVotedUsers={latestVotedUsers} position_list={position_list} totalVotesPerPosition={totalVotesPerPosition} abstainCount={abstainCount} />;
            break;
        case 'partylist_editor':
            dashboardContent = <PartylistEditorDashboard partylists={partylist_list} />;
            break;
        case 'voter':
            dashboardContent = <VoterDashboard voterVoted={voterVoted} election={election} partyList={partylist_list} candidatesAll={candidatesAll} candidates={candidates} positionList={position_list} voters={voters} castedVotes={castedVotes} voteCounts={voteCounts} voterHasVoted={voterHasVoted} candidateWinners={candidateWinners} />;
            break;
    }
    return (

        <AuthenticatedLayout user={auth.user} header={election ? <Countdown election={election} /> : ''} >
            <div className="flex flex-col md:flex-row min-h-screen">

                <main className="flex-1 py-12">
                    <div className="max-w-full  mx-auto sm:max-w-3xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
                        {dashboardContent}
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>

    );
}
