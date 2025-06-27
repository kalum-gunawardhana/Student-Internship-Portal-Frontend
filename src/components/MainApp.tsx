import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Header from './Layout/Header';
import Navigation from './Layout/Navigation';
import StudentDashboard from './Student/StudentDashboard';
import BrowseInternships from './Student/BrowseInternships';
import CompanyDashboard from './Company/CompanyDashboard';
import AdminDashboard from './Admin/AdminDashboard';

const MainApp: React.FC = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('dashboard');

    const renderContent = () => {
        if (!user) return null;

        switch (user.role) {
            case 'STUDENT':
                switch (activeTab) {
                    case 'dashboard':
                        return <StudentDashboard />;
                    case 'browse':
                        return <BrowseInternships />;
                    case 'applications':
                        return <div className="p-6"><h1 className="text-2xl font-bold">My Applications</h1><p className="text-gray-600 mt-2">Track your internship applications here.</p></div>;
                    case 'profile':
                        return <div className="p-6"><h1 className="text-2xl font-bold">Profile</h1><p className="text-gray-600 mt-2">Manage your student profile and resume.</p></div>;
                    default:
                        return <StudentDashboard />;
                }
            case 'COMPANY':
                switch (activeTab) {
                    case 'dashboard':
                        return <CompanyDashboard />;
                    case 'post':
                        return <div className="p-6"><h1 className="text-2xl font-bold">Post New Internship</h1><p className="text-gray-600 mt-2">Create a new internship opportunity.</p></div>;
                    case 'manage':
                        return <div className="p-6"><h1 className="text-2xl font-bold">Manage Posts</h1><p className="text-gray-600 mt-2">Edit and manage your internship posts.</p></div>;
                    case 'applicants':
                        return <div className="p-6"><h1 className="text-2xl font-bold">View Applicants</h1><p className="text-gray-600 mt-2">Review applications from students.</p></div>;
                    default:
                        return <CompanyDashboard />;
                }
            case 'ADMIN':
                switch (activeTab) {
                    case 'dashboard':
                        return <AdminDashboard />;
                    case 'users':
                        return <div className="p-6"><h1 className="text-2xl font-bold">Manage Users</h1><p className="text-gray-600 mt-2">Administer user accounts and permissions.</p></div>;
                    case 'internships':
                        return <div className="p-6"><h1 className="text-2xl font-bold">Manage Internships</h1><p className="text-gray-600 mt-2">Moderate internship posts and content.</p></div>;
                    case 'reports':
                        return <div className="p-6"><h1 className="text-2xl font-bold">Reports</h1><p className="text-gray-600 mt-2">Generate system analytics and reports.</p></div>;
                    default:
                        return <AdminDashboard />;
                }
            default:
                return <div className="p-6"><h1 className="text-2xl font-bold">Welcome</h1></div>;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="flex">
                <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
                <main className="flex-1 overflow-auto">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default MainApp;