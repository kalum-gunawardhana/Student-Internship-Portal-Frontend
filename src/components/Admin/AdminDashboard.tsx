import React, { useState, useEffect } from 'react';
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
import {
    getAllUsers,
    getUserById,
    toggleUserStatus,
    deleteUser,
    type UserProfile
} from '../../api/users';
import {
    getAllInternships,
    adminUpdateInternshipStatus
} from '../../api/internships';

interface Internship {
    id: number;
    title: string;
    companyName: string;
    location: string;
    status: 'DRAFT' | 'PUBLISHED' | 'CLOSED' | 'DELETED';
    createdAt: string;
}

const AdminDashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'users' | 'internships'>('users');
    const [users, setUsers] = useState<UserProfile[]>([]);
    const [internships, setInternships] = useState<Internship[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedRole, setSelectedRole] = useState<'STUDENT' | 'COMPANY' | 'ADMIN' | ''>('');
    const [search, setSearch] = useState('');

    const loadUsers = async () => {
        try {
            setLoading(true);
            const response = await getAllUsers(page, 10, selectedRole || undefined, search);
            setUsers(response.content);
            setTotalPages(response.totalPages);
        } catch (err) {
            setError('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const loadInternships = async () => {
        try {
            setLoading(true);
            const response = await getAllInternships(page, 10);
            setInternships(response.content);
            setTotalPages(response.totalPages);
        } catch (err) {
            setError('Failed to load internships');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === 'users') {
            loadUsers();
        } else {
            loadInternships();
        }
    }, [activeTab, page, selectedRole, search]);

    const handleToggleUserStatus = async (userId: number, enabled: boolean) => {
        try {
            await toggleUserStatus(userId, enabled);
            loadUsers();
        } catch (err) {
            setError('Failed to update user status');
        }
    };

    const handleDeleteUser = async (userId: number) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(userId);
                loadUsers();
            } catch (err) {
                setError('Failed to delete user');
            }
        }
    };

    const handleUpdateInternshipStatus = async (
        internshipId: number,
        status: 'DRAFT' | 'PUBLISHED' | 'CLOSED' | 'DELETED'
    ) => {
        try {
            await adminUpdateInternshipStatus(internshipId, status);
            loadInternships();
        } catch (err) {
            setError('Failed to update internship status');
        }
    };

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

            {/* Tabs */}
            <div className="flex gap-4 mb-6">
                <button
                    onClick={() => setActiveTab('users')}
                    className={`px-4 py-2 rounded ${
                        activeTab === 'users'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    Manage Users
                </button>
                <button
                    onClick={() => setActiveTab('internships')}
                    className={`px-4 py-2 rounded ${
                        activeTab === 'internships'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700'
                    }`}
                >
                    Manage Internships
                </button>
            </div>

            {activeTab === 'users' ? (
                <>
                    {/* User Filters */}
                    <div className="flex gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="p-2 border rounded"
                        />
                        <select
                            value={selectedRole}
                            onChange={(e) => setSelectedRole(e.target.value as any)}
                            className="p-2 border rounded"
                        >
                            <option value="">All Roles</option>
                            <option value="STUDENT">Students</option>
                            <option value="COMPANY">Companies</option>
                            <option value="ADMIN">Admins</option>
                        </select>
                    </div>

                    {/* Users List */}
                    <div className="grid gap-4">
                        {users.map((user) => (
                            <div key={user.id} className="border rounded-lg p-4 shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold">{user.fullName}</h3>
                                        <p className="text-gray-600">{user.email}</p>
                                        <p className="text-sm text-gray-500">Role: {user.role}</p>
                                        {user.role === 'STUDENT' && (
                                            <p className="text-sm text-gray-500">
                                                {user.university} - {user.major}
                                            </p>
                                        )}
                                        {user.role === 'COMPANY' && (
                                            <p className="text-sm text-gray-500">
                                                {user.companyName} - {user.industry}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleToggleUserStatus(user.id, !user.enabled)}
                                            className={`px-3 py-1 rounded ${
                                                user.enabled
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-green-500 text-white'
                                            }`}
                                        >
                                            {user.enabled ? 'Disable' : 'Enable'}
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="px-3 py-1 bg-red-500 text-white rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    {/* Internships List */}
                    <div className="grid gap-4">
                        {internships.map((internship) => (
                            <div key={internship.id} className="border rounded-lg p-4 shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold">{internship.title}</h3>
                                        <p className="text-gray-600">{internship.companyName}</p>
                                        <p className="text-gray-500">{internship.location}</p>
                                        <p className="text-sm text-gray-500">
                                            Created: {new Date(internship.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <select
                                            value={internship.status}
                                            onChange={(e) =>
                                                handleUpdateInternshipStatus(
                                                    internship.id,
                                                    e.target.value as any
                                                )
                                            }
                                            className="p-2 border rounded"
                                        >
                                            <option value="DRAFT">Draft</option>
                                            <option value="PUBLISHED">Published</option>
                                            <option value="CLOSED">Closed</option>
                                            <option value="DELETED">Deleted</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Pagination */}
            <div className="mt-6 flex justify-center gap-2">
                <button
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={page >= totalPages - 1}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;