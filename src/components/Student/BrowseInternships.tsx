import React, { useState } from 'react';
import { Search, MapPin, Clock, DollarSign, Building, Filter } from 'lucide-react';
import type { InternshipPost } from '../../types';

const BrowseInternships: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    // Mock internship data
    const internships: InternshipPost[] = [
        {
            id: '1',
            title: 'Software Development Intern',
            description: 'Join our dynamic team to work on cutting-edge web applications using React, Node.js, and cloud technologies.',
            location: 'San Francisco, CA',
            duration: '3 months',
            requirements: ['React', 'JavaScript', 'Git', 'Problem-solving'],
            benefits: ['Mentorship', 'Flexible hours', 'Learning opportunities'],
            stipend: '$2,000/month',
            createdBy: '2',
            companyName: 'TechCorp Solutions',
            createdAt: '2024-01-10T00:00:00Z',
            deadline: '2024-02-15T00:00:00Z',
            status: 'ACTIVE',
            applicationsCount: 45,
        },
        {
            id: '2',
            title: 'Data Science Intern',
            description: 'Analyze large datasets and build machine learning models to drive business insights and decision-making.',
            location: 'New York, NY',
            duration: '4 months',
            requirements: ['Python', 'SQL', 'Machine Learning', 'Statistics'],
            benefits: ['Training programs', 'Certification', 'Full-time offer potential'],
            stipend: '$2,500/month',
            createdBy: '3',
            companyName: 'Innovation Labs',
            createdAt: '2024-01-08T00:00:00Z',
            deadline: '2024-02-20T00:00:00Z',
            status: 'ACTIVE',
            applicationsCount: 78,
        },
        {
            id: '3',
            title: 'Digital Marketing Intern',
            description: 'Create engaging content and manage social media campaigns for our growing startup.',
            location: 'Austin, TX',
            duration: '6 months',
            requirements: ['Social Media', 'Content Creation', 'Analytics', 'Creativity'],
            benefits: ['Remote work', 'Creative freedom', 'Performance bonuses'],
            stipend: '$1,500/month',
            createdBy: '4',
            companyName: 'StartupX',
            createdAt: '2024-01-05T00:00:00Z',
            deadline: '2024-02-10T00:00:00Z',
            status: 'ACTIVE',
            applicationsCount: 32,
        },
    ];

    const filteredInternships = internships.filter(internship =>
        internship.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (locationFilter === '' || internship.location.toLowerCase().includes(locationFilter.toLowerCase()))
    );

    const handleApply = (internshipId: string) => {
        alert(`Applied to internship ${internshipId}! This would integrate with your backend API.`);
    };

    return (
        <div className="p-6 space-y-6">
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
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Location..."
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Filter className="w-5 h-5" />
                        <span>Filters</span>
                    </button>
                </div>

                {showFilters && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option value="">Any duration</option>
                                    <option value="3">3 months</option>
                                    <option value="6">6 months</option>
                                    <option value="12">12 months</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Stipend Range</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option value="">Any stipend</option>
                                    <option value="1000">$1,000+</option>
                                    <option value="2000">$2,000+</option>
                                    <option value="3000">$3,000+</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                    <option value="">Any industry</option>
                                    <option value="tech">Technology</option>
                                    <option value="finance">Finance</option>
                                    <option value="marketing">Marketing</option>
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Results Summary */}
            <div className="flex items-center justify-between">
                <p className="text-gray-600">
                    Showing {filteredInternships.length} of {internships.length} internships
                </p>
                <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="recent">Most Recent</option>
                    <option value="deadline">Deadline</option>
                    <option value="applications">Least Applications</option>
                </select>
            </div>

            {/* Internship Cards */}
            <div className="space-y-6">
                {filteredInternships.map((internship) => (
                    <div key={internship.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <div className="p-2 bg-blue-100 rounded-lg">
                                            <Building className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">{internship.title}</h3>
                                            <p className="text-gray-600">{internship.companyName}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 mb-4">{internship.description}</p>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                                    {internship.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <MapPin className="w-4 h-4" />
                                    <span className="text-sm">{internship.location}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm">{internship.duration}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-gray-600">
                                    <DollarSign className="w-4 h-4" />
                                    <span className="text-sm">{internship.stipend}</span>
                                </div>
                                <div className="text-sm text-gray-600">
                                    {internship.applicationsCount} applications
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {internship.requirements.map((req, index) => (
                                        <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md">
                                            {req}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h4 className="font-medium text-gray-900 mb-2">Benefits:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {internship.benefits.map((benefit, index) => (
                                        <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-md">
                                            {benefit}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                                <div className="text-sm text-gray-500">
                                    Deadline: {new Date(internship.deadline).toLocaleDateString()}
                                </div>
                                <button
                                    onClick={() => handleApply(internship.id)}
                                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredInternships.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No internships found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria or filters</p>
                </div>
            )}
        </div>
    );
};

export default BrowseInternships;