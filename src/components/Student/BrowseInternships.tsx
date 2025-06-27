import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, DollarSign, Building, Filter } from 'lucide-react';
import type { InternshipPost } from '../../types';
import { fetchActiveInternships } from '../../api/internships';
import { applyForInternship, applyWithResume } from '../../api/applications';

interface Internship {
    id: number;
    title: string;
    companyName: string;
    location: string;
    description: string;
    requirements: string;
    salary?: string;
    applicationDeadline?: string;
    isRemote?: boolean;
}

const BrowseInternships: React.FC = () => {
    const [internships, setInternships] = useState<Internship[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState('');
    const [location, setLocation] = useState('');
    const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
    const [coverLetter, setCoverLetter] = useState('');
    const [resume, setResume] = useState<File | null>(null);

    const loadInternships = async () => {
        try {
            setLoading(true);
            const response = await fetchActiveInternships({
                page,
                size: 10,
                search,
                location,
                sortBy: 'createdAt',
                sortDir: 'desc'
            });
            setInternships(response.content);
            setTotalPages(response.totalPages);
        } catch (err) {
            setError('Failed to load internships. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInternships();
    }, [page, search, location]);

    const handleApply = async (internship: Internship) => {
        try {
            if (resume) {
                // Apply with resume
                await applyWithResume(internship.id, resume, coverLetter);
            } else {
                // Apply without resume
                await applyForInternship({
                    internshipPostId: internship.id,
                    coverLetter
                });
            }
            alert('Application submitted successfully!');
            setSelectedInternship(null);
            setCoverLetter('');
            setResume(null);
        } catch (err) {
            setError('Failed to submit application. Please try again.');
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setResume(event.target.files[0]);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Internships</h1>
                <p className="text-gray-600">Discover exciting internship opportunities from top companies</p>
            </div>

            {/* Search and Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search internships..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Location..."
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <button
                        onClick={() => setSelectedInternship(null)}
                        className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Filter className="w-5 h-5" />
                        <span>Filters</span>
                    </button>
                </div>
            </div>

            {/* Internships list */}
            <div className="grid gap-6">
                {internships.map((internship) => (
                    <div key={internship.id} className="border rounded-lg p-4 shadow">
                        <h2 className="text-xl font-bold">{internship.title}</h2>
                                            <p className="text-gray-600">{internship.companyName}</p>
                        <p>{internship.location} {internship.isRemote && '(Remote)'}</p>
                        <p className="mt-2">{internship.description}</p>
                        {internship.salary && <p className="text-green-600">Salary: {internship.salary}</p>}
                                <button
                            onClick={() => setSelectedInternship(internship)}
                            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                >
                                    Apply Now
                                </button>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center gap-2">
                <button
                    onClick={() => setPage(p => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={page >= totalPages - 1}
                    className="px-4 py-2 border rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>

            {/* Application Modal */}
            {selectedInternship && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg max-w-lg w-full">
                        <h3 className="text-xl font-bold mb-4">
                            Apply for {selectedInternship.title}
                        </h3>
                        <textarea
                            placeholder="Cover Letter..."
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            className="w-full p-2 border rounded mb-4"
                            rows={6}
                        />
                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                            className="mb-4"
                        />
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setSelectedInternship(null)}
                                className="px-4 py-2 border rounded"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleApply(selectedInternship)}
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            >
                                Submit Application
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BrowseInternships;