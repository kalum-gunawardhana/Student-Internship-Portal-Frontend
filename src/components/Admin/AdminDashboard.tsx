import React from 'react';
import {
    Users,
    Building,
    FileText,
    TrendingUp,
    Shield,
    AlertTriangle,
    CheckCircle,
    Activity
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
    const stats = [
        {
            title: 'Total Users',
            value: '1,247',
            icon: Users,
            color: 'bg-blue-500',
            trend: '+123 this month',
            breakdown: 'Students: 892, Companies: 355'
        },
        {
            title: 'Active Internships',
            value: '156',
            icon: Building,
            color: 'bg-green-500',
            trend: '+28 this week',
            breakdown: 'Posted: 89, Filled: 67'
        },
        {
            title: 'Applications',
            value: '3,421',
            icon: FileText,
            color: 'bg-yellow-500',
            trend: '+234 today',
            breakdown: 'Pending: 1,234, Processed: 2,187'
        },
        {
            title: 'Success Rate',
            value: '74%',
            icon: TrendingUp,
            color: 'bg-emerald-500',
            trend: '+5% improvement',
            breakdown: 'Placement success rate'
        },
    ];

    const recentActivity = [
        {
            id: '1',
            type: 'USER_REGISTRATION',
            message: 'New student registered: John Smith from MIT',
            timestamp: '5 minutes ago',
            status: 'INFO'
        },
        {
            id: '2',
            type: 'INTERNSHIP_POSTED',
            message: 'TechCorp posted new Software Development internship',
            timestamp: '1 hour ago',
            status: 'SUCCESS'
        },
        {
            id: '3',
            type: 'POLICY_VIOLATION',
            message: 'Reported inappropriate content in application #1234',
            timestamp: '2 hours ago',
            status: 'WARNING'
        },
        {
            id: '4',
            type: 'SYSTEM_ALERT',
            message: 'High server load detected, monitoring...',
            timestamp: '3 hours ago',
            status: 'ERROR'
        },
    ];

    const pendingReviews = [
        {
            id: '1',
            type: 'Company Verification',
            company: 'StartupX Inc.',
            submitted: '2024-01-15',
            priority: 'HIGH'
        },
        {
            id: '2',
            type: 'Content Moderation',
            company: 'Tech Solutions Ltd.',
            submitted: '2024-01-14',
            priority: 'MEDIUM'
        },
        {
            id: '3',
            type: 'User Report',
            company: 'Innovation Labs',
            submitted: '2024-01-13',
            priority: 'LOW'
        },
    ];

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'USER_REGISTRATION':
                return <Users className="w-4 h-4" />;
            case 'INTERNSHIP_POSTED':
                return <Building className="w-4 h-4" />;
            case 'POLICY_VIOLATION':
                return <AlertTriangle className="w-4 h-4" />;
            case 'SYSTEM_ALERT':
                return <Activity className="w-4 h-4" />;
            default:
                return <FileText className="w-4 h-4" />;
        }
    };

    const getActivityColor = (status: string) => {
        switch (status) {
            case 'SUCCESS':
                return 'text-green-600 bg-green-100';
            case 'WARNING':
                return 'text-yellow-600 bg-yellow-100';
            case 'ERROR':
                return 'text-red-600 bg-red-100';
            default:
                return 'text-blue-600 bg-blue-100';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'HIGH':
                return 'bg-red-100 text-red-800';
            case 'MEDIUM':
                return 'bg-yellow-100 text-yellow-800';
            case 'LOW':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                    <p className="text-gray-600">System overview and administrative controls</p>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-800 rounded-lg">
                    <Shield className="w-5 h-5" />
                    <span className="font-medium">Admin Access</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex items-center text-sm">
                                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                    <span className="text-green-600 font-medium">{stat.trend}</span>
                                </div>
                                <p className="text-xs text-gray-500">{stat.breakdown}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Activity */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
                        <p className="text-gray-600 mt-1">System events and user actions</p>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {recentActivity.map((activity) => (
                                <div key={activity.id} className="flex items-start space-x-3">
                                    <div className={`p-2 rounded-lg ${getActivityColor(activity.status)}`}>
                                        {getActivityIcon(activity.type)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-gray-900">{activity.message}</p>
                                        <p className="text-xs text-gray-500 mt-1">{activity.timestamp}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 text-center">
                            <button className="text-blue-600 hover:text-blue-700 font-medium">
                                View All Activity →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pending Reviews */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-6 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-900">Pending Reviews</h2>
                        <p className="text-gray-600 mt-1">Items requiring administrative attention</p>
                    </div>
                    <div className="p-6">
                        <div className="space-y-4">
                            {pendingReviews.map((review) => (
                                <div key={review.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                    <div className="flex-1">
                                        <h3 className="font-medium text-gray-900">{review.type}</h3>
                                        <p className="text-gray-600">{review.company}</p>
                                        <p className="text-sm text-gray-500 mt-1">Submitted: {review.submitted}</p>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(review.priority)}`}>
                                            {review.priority}
                                        </span>
                                        <button className="text-blue-600 hover:text-blue-700 font-medium">
                                            Review
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 text-center">
                            <button className="text-blue-600 hover:text-blue-700 font-medium">
                                View All Reviews →
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                    <Users className="w-8 h-8 mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Manage Users</h3>
                    <p className="text-blue-100 text-sm mb-4">View and moderate user accounts</p>
                    <button className="bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
                        Open Panel
                    </button>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
                    <Building className="w-8 h-8 mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Internships</h3>
                    <p className="text-green-100 text-sm mb-4">Monitor and moderate posts</p>
                    <button className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors">
                        View All
                    </button>
                </div>
                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
                    <FileText className="w-8 h-8 mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Reports</h3>
                    <p className="text-yellow-100 text-sm mb-4">Generate system reports</p>
                    <button className="bg-white text-yellow-600 px-4 py-2 rounded-lg font-medium hover:bg-yellow-50 transition-colors">
                        Generate
                    </button>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                    <Shield className="w-8 h-8 mb-3" />
                    <h3 className="text-lg font-semibold mb-2">Security</h3>
                    <p className="text-purple-100 text-sm mb-4">Monitor system security</p>
                    <button className="bg-white text-purple-600 px-4 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                        Check Status
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;