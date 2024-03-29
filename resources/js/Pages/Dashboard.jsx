import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

import AdminDashboard from './Admin/AdminDashboard';
import ModeratorDashboard from './Moderator/ModeratorDashboard';
import VoterDashboard from './Voter/VoterDashboard';
import PartylistEditorDashboard from './Partylist_Editor/PartylistEditorDashboard';
import Sidebar from './Sidebar';

export default function Dashboard({ auth }) {

    const { role } = auth.user;
    let dashboardContent;
    switch (role) {
        case 'admin':
            dashboardContent = <AdminDashboard />;
            break;
        case 'moderator':
            dashboardContent = <ModeratorDashboard />;
            break;
        case 'party_list_editor':
            dashboardContent = <PartylistEditorDashboard />;
            break;
        case 'voter':
            dashboardContent = <VoterDashboard />;
            break;
    }
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>} >
            <div className="flex flex-col md:flex-row min-h-screen">
                {/* Sidebar */}
                {/* Add your sidebar component here */}

                {/* Main Content */}
                <main className="flex-1 py-12">
                    <div className="max-w-full mx-auto px-4 sm:max-w-3xl md:max-w-4xl lg:max-w-6xl xl:max-w-7xl">
                        {dashboardContent}
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>

    );
}
