import React from 'react';
import {
    Home,
    Search,
    FileText,
    Users,
    Settings,
    Plus,
    Building,
    GraduationCap
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface NavigationProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, onTabChange }) => {
    const { user } = useAuth();

    const getNavigationItems = () => {
        switch (user?.role) {
            case 'STUDENT':
                return [
                    { id: 'dashboard', label: 'Dashboard', icon: Home },
                    { id: 'browse', label: 'Browse Internships', icon: Search },
                    { id: 'applications', label: 'My Applications', icon: FileText },
                    { id: 'profile', label: 'Profile', icon: Users },
                ];
            case 'COMPANY':
                return [
                    { id: 'dashboard', label: 'Dashboard', icon: Home },
                    { id: 'post', label: 'Post Internship', icon: Plus },
                    { id: 'manage', label: 'Manage Posts', icon: Building },
                    { id: 'applicants', label: 'View Applicants', icon: Users },
                ];
            case 'ADMIN':
                return [
                    { id: 'dashboard', label: 'Dashboard', icon: Home },
                    { id: 'users', label: 'Manage Users', icon: Users },
                    { id: 'internships', label: 'Manage Internships', icon: Building },
                    { id: 'reports', label: 'Reports', icon: FileText },
                ];
            default:
                return [];
        }
    };

    const navigationItems = getNavigationItems();

    return (
        <nav className="bg-white shadow-sm border-r border-gray-200 w-64 min-h-screen">
            <div className="p-4 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <GraduationCap className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900">{user?.fullName}</h2>
                        <p className="text-sm text-gray-500 capitalize">
                            {user?.role?.toLowerCase()} Portal
                        </p>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <ul className="space-y-2">
                    {navigationItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <li key={item.id}>
                                <button
                                    onClick={() => onTabChange(item.id)}
                                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === item.id
                                            ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                            : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;