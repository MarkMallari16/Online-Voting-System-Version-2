import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import AdminDashboard from './Admin/AdminDashboard';
import ModeratorDashboard from './Moderator/ModeratorDashboard';
import VoterDashboard from './Voter/VoterDashboard';
import PartylistEditorDashboard from './Partylist_Editor/PartylistEditorDashboard';
import Sidebar from './Sidebar';
import Countdown from '@/Components/Countdown';
import { Breadcrumbs } from '@material-tailwind/react';
export default function Dashboard({ auth, candidates, candidatesAll, position_list, partylist_list, election, voters }) {

    console.log("voter", voters)
    const { role } = auth.user;
    let dashboardContent;
    switch (role) {
        case 'admin':
            dashboardContent = <AdminDashboard />;
            break;
        case 'moderator':
            dashboardContent = <ModeratorDashboard voters={voters} election={election} candidates={candidates} />;
            break;
        case 'partylist_editor':
            dashboardContent = <PartylistEditorDashboard />;
            break;
        case 'voter':
            dashboardContent = <VoterDashboard election={election} partyList={partylist_list} candidatesAll={candidatesAll} positionList={position_list} />;
            break;
    }
    return (

        <AuthenticatedLayout user={auth.user} header={election ? <Countdown election={election} /> : ''} >
            <div className="flex flex-col md:flex-row min-h-screen">

                <main className="flex-1 py-12">
                    <div className="max-w-full  mx-auto px-4 sm:max-w-3xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
                        <Breadcrumbs className=''>
                            <a href={route('dashboard')} className="opacity-60">
                                Dashboard
                            </a>


                        </Breadcrumbs>
                        {dashboardContent}
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>

    );
}
