import React from 'react';
import {
    Search,
    FileText,
    CheckCircle,
    Clock,
    XCircle,
    TrendingUp
} from 'lucide-react';

const StudentDashboard: React.FC = () => {
    const stats = [
        {
            title: 'Available Internships',
            value: '127',
            icon: Search,
            color: 'bg-blue-500',
            trend: '+12%'
        },
        {
            title: 'Applications Sent',
            value: '8',
            icon: FileText,
            color: 'bg-green-500',
            trend: '+2'
        },
        {
            title: 'Pending Reviews',
            value: '5',
            icon: Clock,
            color: 'bg-yellow-500',
            trend: '3 new'
        },
        {
            title: 'Accepted',
            value: '1',
            icon: CheckCircle,
            color: 'bg-emerald-500',
            trend: 'This week'
        },
    ];

    const recentApplications = [
        {
            id: '1',
            company: 'TechCorp Solutions',
            position: 'Software Development Intern',
            status: 'PENDING',
            appliedDate: '2024-01-15',
        },
        {
            id: '2',
            company: 'Innovation Labs',
            position: 'Data Science Intern',
            status: 'ACCEPTED',
            appliedDate: '2024-01-12',
        },
        {
            id: '3',
            company: 'StartupX',
            position: 'Marketing Intern',
            status: 'REJECTED',
            appliedDate: '2024-01-10',
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ACCEPTED':
                return 'bg-green-100 text-green-800';
            case 'REJECTED':
                return 'bg-red-100 text-red-800';
            case 'PENDING':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'ACCEPTED':
                return <CheckCircle className="w-4 h-4" />;
            case 'REJECTED':
                return <XCircle className="w-4 h-4" />;
            case 'PENDING':
                return <Clock className="w-4 h-4" />;
            default:
                return <Clock className="w-4 h-4" />;
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Student Dashboard</h1>
                <p className="text-gray-600">Track your internship applications and discover new opportunities</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                <span className="text-green-600 font-medium">{stat.trend}</span>
                                <span className="text-gray-500 ml-1">from last month</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Applications</h2>
                    <p className="text-gray-600 mt-1">Keep track of your latest internship applications</p>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        {recentApplications.map((application) => (
                            <div key={application.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">{application.position}</h3>
                                    <p className="text-gray-600">{application.company}</p>
                                    <p className="text-sm text-gray-500 mt-1">Applied on {application.appliedDate}</p>
                                </div>
                                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                                    {getStatusIcon(application.status)}
                                    <span>{application.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-center">
                        <button className="text-blue-600 hover:text-blue-700 font-medium">
                            View All Applications →
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">Discover New Opportunities</h3>
                    <p className="text-blue-100 mb-4">Browse through 127+ internship positions from top companies</p>
                    <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                        Browse Internships
                    </button>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                    <h3 className="text-xl font-semibold mb-2">Complete Your Profile</h3>
                    <p className="text-green-100 mb-4">Add your resume and skills to stand out to employers</p>
                    <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
                        Update Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentDashboard;