import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { AuthState, User } from '../types';

interface AuthContextType extends AuthState {
    login: (email: string, password: string) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
    | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
    | { type: 'LOGOUT' }
    | { type: 'SET_LOADING'; payload: boolean };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
            };
        case 'LOGOUT':
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            return {
                user: null,
                token: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

// Mock users for demo
const mockUsers = [
    {
        id: '1',
        username: 'john_student',
        email: 'john@student.com',
        password: 'password123',
        role: 'STUDENT' as const,
        fullName: 'John Smith',
        university: 'MIT',
        major: 'Computer Science',
        graduationYear: 2025,
        createdAt: '2024-01-01T00:00:00Z',
    },
    {
        id: '2',
        username: 'tech_corp',
        email: 'hr@techcorp.com',
        password: 'password123',
        role: 'COMPANY' as const,
        fullName: 'TechCorp HR',
        companyName: 'TechCorp Solutions',
        industry: 'Technology',
        website: 'https://techcorp.com',
        createdAt: '2024-01-01T00:00:00Z',
    },
    {
        id: '3',
        username: 'admin',
        email: 'admin@portal.com',
        password: 'admin123',
        role: 'ADMIN' as const,
        fullName: 'System Administrator',
        createdAt: '2024-01-01T00:00:00Z',
    },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        token: null,
        isAuthenticated: false,
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: { user: JSON.parse(user), token },
            });
        }
    }, []);

    const login = async (email: string, password: string) => {
        // Mock authentication
        const user = mockUsers.find(u => u.email === email && u.password === password);
        if (!user) {
            throw new Error('Invalid credentials');
        }

        const token = 'mock-jwt-token-' + user.id;
        const { password: _, ...userWithoutPassword } = user;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));

        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user: userWithoutPassword, token },
        });
    };

    const register = async (userData: any) => {
        // Mock registration
        await new Promise(resolve => setTimeout(resolve, 1000));
        const newUser = {
            id: Date.now().toString(),
            ...userData,
            createdAt: new Date().toISOString(),
        };

        const token = 'mock-jwt-token-' + newUser.id;

        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(newUser));

        dispatch({
            type: 'LOGIN_SUCCESS',
            payload: { user: newUser, token },
        });
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    return (
        <AuthContext.Provider value={{ ...state, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};