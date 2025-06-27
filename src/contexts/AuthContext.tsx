import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { AuthState, User } from '../types';
import type { RegisterPayload, LoginResponse, RegisterResponse } from '../api/auth';
import { loginApi, registerApi, logout as logoutApi } from '../api/auth';

interface AuthContextType extends AuthState {
    login: (username: string, password: string) => Promise<void>;
    register: (userData: RegisterPayload) => Promise<RegisterResponse>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthAction =
    | { type: 'LOGIN_SUCCESS'; payload: LoginResponse }
    | { type: 'LOGOUT' }
    | { type: 'SET_LOADING'; payload: boolean };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                user: {
                    id: String(action.payload.id),
                    username: action.payload.username,
                    email: action.payload.email,
                    fullName: action.payload.fullName,
                    role: action.payload.role,
                    createdAt: new Date().toISOString(),
                },
                token: action.payload.token,
                isAuthenticated: true,
            };
        case 'LOGOUT':
            return {
                user: null,
                token: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        token: null,
        isAuthenticated: false,
    });

    useEffect(() => {
        // Check for stored auth state on mount
        const token = localStorage.getItem('jwt_token');
        const userStr = localStorage.getItem('user');
        if (token && userStr) {
            try {
                const user = JSON.parse(userStr);
            dispatch({
                type: 'LOGIN_SUCCESS',
                    payload: { ...user, token },
            });
            } catch (error) {
                // If there's an error parsing the stored user data, clear it
                localStorage.removeItem('jwt_token');
                localStorage.removeItem('user');
            }
        }
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const response = await loginApi(username, password);
            
            // Store both token and user data
            localStorage.setItem('jwt_token', response.token);
            localStorage.setItem('user', JSON.stringify({
                id: response.id,
                username: response.username,
                email: response.email,
                fullName: response.fullName,
                role: response.role
            }));
            
            dispatch({ type: 'LOGIN_SUCCESS', payload: response });
        } catch (error) {
            // Clear any potentially inconsistent storage state
            localStorage.removeItem('jwt_token');
            localStorage.removeItem('user');
            throw error;
        }
    };

    const register = async (userData: RegisterPayload) => {
        const response = await registerApi(userData);
        // After successful registration, log the user in
        await login(userData.username, userData.password);
        return response;
    };

    const logout = () => {
        logoutApi(); // This will remove the JWT token
        localStorage.removeItem('user');
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