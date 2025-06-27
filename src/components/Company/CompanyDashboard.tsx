import React, { useState, useEffect } from 'react';
import {
    Plus,
    Eye,
    Users,
    TrendingUp,
    FileText,
    CheckCircle,
    Clock
} from 'lucide-react';
import {
    getMyInternships,
    createInternship,
    updateInternshipStatus,
    deleteInternship,
} from '../../api/internships';
import type { InternshipPostRequest } from '../../api/internships';
import {
    getReceivedApplications,
    getApplicationsForInternship,
    updateApplicationStatus
} from '../../api/applications';

interface Internship {
    id: number;
    title: string;
    description: string;
    location: string;
    requirements: string;
    responsibilities: string;
    salary?: string;
    startDate?: string;
    endDate?: string;
    applicationDeadline?: string;
    status: 'DRAFT' | 'PUBLISHED' | 'CLOSED' | 'DELETED';
    applicationsCount: number;
}

interface Application {
    id: number;
    studentName: string;
    studentEmail: string;
    appliedAt: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN';
    coverLetter?: string;
    resumeUrl?: string;
}

const CompanyDashboard: React.FC = () => {
    const [internships, setInternships] = useState<Internship[]>([]);
    const [applications, setApplications] = useState<Application[]>([]);
    const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState<InternshipPostRequest>({
        title: '',
        description: '',
        location: '',
        requirements: '',
        responsibilities: '',
    });

    const loadInternships = async () => {
        try {
            setLoading(true);
            const response = await getMyInternships();
            setInternships(response.content);
        } catch (err) {
            setError('Failed to load internships');
        } finally {
            setLoading(false);
        }
    };

    const loadApplications = async (internshipId?: number) => {
        try {
            const response = internshipId
                ? await getApplicationsForInternship(internshipId, 0, 10)
                : await getReceivedApplications();
            setApplications(response.content);
        } catch (err) {
            setError('Failed to load applications');
        }
    };

    useEffect(() => {
        loadInternships();
        loadApplications();
    }, []);

    const handleCreateInternship = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createInternship(formData);
            setIsCreating(false);
            setFormData({
                title: '',
                description: '',
                location: '',
                requirements: '',
                responsibilities: '',
            });
            loadInternships();
        } catch (err) {
            setError('Failed to create internship');
        }
    };

    const handleStatusChange = async (internshipId: number, status: 'DRAFT' | 'PUBLISHED' | 'CLOSED') => {
        try {
            await updateInternshipStatus(internshipId, status);
            loadInternships();
        } catch (err) {
            setError('Failed to update status');
        }
    };

    const handleDeleteInternship = async (internshipId: number) => {
        if (window.confirm('Are you sure you want to delete this internship?')) {
            try {
                await deleteInternship(internshipId);
                loadInternships();
            } catch (err) {
                setError('Failed to delete internship');
            }
        }
    };

    const handleApplicationStatus = async (applicationId: number, status: 'ACCEPTED' | 'REJECTED') => {
        try {
            await updateApplicationStatus(applicationId, status);
            loadApplications(selectedInternship?.id);
        } catch (err) {
            setError('Failed to update application status');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Company Dashboard</h1>
                <button
                    onClick={() => setIsCreating(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Post New Internship
                </button>
            </div>

            {/* Create Internship Form */}
            {isCreating && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg max-w-2xl w-full">
                        <h2 className="text-xl font-bold mb-4">Create New Internship</h2>
                        <form onSubmit={handleCreateInternship} className="space-y-4">
                            <div>
                                <label className="block mb-1">Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    rows={4}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Location</label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block mb-1">Requirements</label>
                                <textarea
                                    value={formData.requirements}
                                    onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    rows={4}
                                    required
                                />
                            </div>
                                <div>
                                <label className="block mb-1">Responsibilities</label>
                                <textarea
                                    value={formData.responsibilities}
                                    onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })}
                                    className="w-full p-2 border rounded"
                                    rows={4}
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setIsCreating(false)}
                                    className="px-4 py-2 border rounded"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                    Create Internship
                                </button>
                            </div>
                        </form>
                                </div>
                                </div>
            )}

            {/* Internships List */}
            <div className="grid gap-6 mb-8">
                {internships.map((internship) => (
                    <div key={internship.id} className="border rounded-lg p-4 shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-xl font-bold">{internship.title}</h3>
                                <p className="text-gray-600">{internship.location}</p>
                            </div>
                            <div className="flex gap-2">
                                <select
                                    value={internship.status}
                                    onChange={(e) => handleStatusChange(internship.id, e.target.value as any)}
                                    className="border rounded p-2"
                                >
                                    <option value="DRAFT">Draft</option>
                                    <option value="PUBLISHED">Published</option>
                                    <option value="CLOSED">Closed</option>
                                </select>
                                <button
                                    onClick={() => handleDeleteInternship(internship.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                        <p className="mb-4">{internship.description}</p>
                        <button
                            onClick={() => {
                                setSelectedInternship(internship);
                                loadApplications(internship.id);
                            }}
                            className="text-blue-500 hover:text-blue-700"
                        >
                            View {internship.applicationsCount} Applications
                        </button>
                    </div>
                ))}
            </div>

            {/* Applications List */}
            {selectedInternship && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold mb-4">
                        Applications for {selectedInternship.title}
                    </h2>
                    <div className="grid gap-4">
                        {applications.map((application) => (
                            <div key={application.id} className="border rounded-lg p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h4 className="font-bold">{application.studentName}</h4>
                                        <p className="text-gray-600">{application.studentEmail}</p>
                                        <p className="text-sm text-gray-500">
                                            Applied: {new Date(application.appliedAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleApplicationStatus(application.id, 'ACCEPTED')}
                                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                            disabled={application.status !== 'PENDING'}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() => handleApplicationStatus(application.id, 'REJECTED')}
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                            disabled={application.status !== 'PENDING'}
                                        >
                                            Reject
                                        </button>
                </div>
                                </div>
                                {application.coverLetter && (
                                    <div className="mt-2">
                                        <p className="font-medium">Cover Letter:</p>
                                        <p className="text-gray-700">{application.coverLetter}</p>
                                    </div>
                                )}
                                {application.resumeUrl && (
                                    <div className="mt-2">
                                        <a
                                            href={application.resumeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:text-blue-700"
                                        >
                                            View Resume
                                        </a>
                                </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompanyDashboard;