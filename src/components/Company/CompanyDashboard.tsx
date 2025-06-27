import React from 'react';
import {
    Plus,
    Eye,
    Users,
    TrendingUp,
    FileText,
    CheckCircle,
    Clock
} from 'lucide-react';

const CompanyDashboard: React.FC = () => {
    const stats = [
        {
            title: 'Active Posts',
            value: '12',
            icon: FileText,
            color: 'bg-blue-500',
            trend: '+3 this month'
        },
        {
            title: 'Total Applications',
            value: '247',
            icon: Users,
            color: 'bg-green-500',
            trend: '+45 this week'
        },
        {
            title: 'Pending Reviews',
            value: '89',
            icon: Clock,
            color: 'bg-yellow-500',
            trend: 'Needs attention'
        },
        {
            title: 'Hired Interns',
            value: '18',
            icon: CheckCircle,
            color: 'bg-emerald-500',
            trend: 'This quarter'
        },
    ];

    const recentPosts = [
        {
            id: '1',
            title: 'Software Development Intern',
            applications: 45,
            status: 'ACTIVE',
            deadline: '2024-02-15',
        },
        {
            id: '2',
            title: 'Product Manager Intern',
            applications: 32,
            status: 'ACTIVE',
            deadline: '2024-02-20',
        },
        {
            id: '3',
            title: 'UI/UX Design Intern',
            applications: 78,
            status: 'CLOSED',
            deadline: '2024-01-30',
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ACTIVE':
                return 'bg-green-100 text-green-800';
            case 'CLOSED':
                return 'bg-red-100 text-red-800';
            case 'DRAFT':
                return 'bg-yellow-100 text-yellow-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Company Dashboard</h1>
                    <p className="text-gray-600">Manage your internship posts and review applications</p>
                </div>
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <Plus className="w-5 h-5" />
                    <span>Post New Internship</span>
                </button>
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
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Posts */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">Recent Internship Posts</h2>
                    <p className="text-gray-600 mt-1">Monitor the performance of your latest posts</p>
                </div>
                <div className="p-6">
                    <div className="space-y-4">
                        {recentPosts.map((post) => (
                            <div key={post.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-900">{post.title}</h3>
                                    <p className="text-gray-600">{post.applications} applications received</p>
                                    <p className="text-sm text-gray-500 mt-1">Deadline: {post.deadline}</p>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(post.status)}`}>
                                        {post.status}
                                    </span>
                                    <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                                        <Eye className="w-4 h-4" />
                                        <span>View</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 text-center">
                        <button className="text-blue-600 hover:text-blue-700 font-medium">
                            View All Posts →
                        </button>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                    <Plus className="w-8 h-8 mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Post New Internship</h3>
                    <p className="text-blue-100 text-sm mb-4">Create a new internship opportunity</p>
                    <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                        Get Started
                    </button>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                    <Users className="w-8 h-8 mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Review Applications</h3>
                    <p className="text-green-100 text-sm mb-4">89 applications waiting for review</p>
                    <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
                        Review Now
                    </button>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                    <TrendingUp className="w-8 h-8 mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Analytics</h3>
                    <p className="text-purple-100 text-sm mb-4">View detailed performance metrics</p>
                    <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                        View Reports
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompanyDashboard;