import React from 'react';
import { LogOut, User, Building, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
    const { user, logout } = useAuth();

    const getRoleIcon = () => {
        switch (user?.role) {
            case 'STUDENT':
                return <User className="w-4 h-4" />;
            case 'COMPANY':
                return <Building className="w-4 h-4" />;
            case 'ADMIN':
                return <Shield className="w-4 h-4" />;
            default:
                return <User className="w-4 h-4" />;
        }
    };

    const getRoleColor = () => {
        switch (user?.role) {
            case 'STUDENT':
                return 'bg-blue-100 text-blue-800';
            case 'COMPANY':
                return 'bg-green-100 text-green-800';
            case 'ADMIN':
                return 'bg-purple-100 text-purple-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <header className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold text-gray-900">
                                InternConnect
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getRoleColor()}`}>
                                {getRoleIcon()}
                                <span>{user?.role}</span>
                            </div>
                            <div className="text-sm">
                                <p className="font-medium text-gray-900">{user?.fullName}</p>
                                <p className="text-gray-500">{user?.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;