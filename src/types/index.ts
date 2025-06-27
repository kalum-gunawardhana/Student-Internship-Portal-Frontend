export interface User {
    id: string;
    username: string;
    email: string;
    role: 'STUDENT' | 'COMPANY' | 'ADMIN';
    fullName: string;
    createdAt: string;
}

export interface Student extends User {
    role: 'STUDENT';
    university?: string;
    major?: string;
    graduationYear?: number;
    resume?: string;
}

export interface Company extends User {
    role: 'COMPANY';
    companyName: string;
    industry?: string;
    website?: string;
    description?: string;
}

export interface InternshipPost {
    id: string;
    title: string;
    description: string;
    location: string;
    duration: string;
    requirements: string[];
    benefits: string[];
    stipend?: string;
    createdBy: string;
    companyName: string;
    createdAt: string;
    deadline: string;
    status: 'ACTIVE' | 'CLOSED' | 'DRAFT';
    applicationsCount: number;
}

export interface Application {
    id: string;
    studentId: string;
    postId: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN';
    appliedAt: string;
    resumeLink?: string;
    coverLetter?: string;
    studentName: string;
    internshipTitle: string;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}