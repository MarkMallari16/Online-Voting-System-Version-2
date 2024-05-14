import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen pt-6 sm:pt-0  gap-5">
            <div className="w-full sm:max-w-xl px-6 py-4 bg-white shadow-md  overflow-hidden sm:rounded-lg">
                {children}
            </div>

        </div>
    );
}
