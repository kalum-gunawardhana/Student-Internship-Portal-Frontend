import React, { useState } from 'react';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface LoginFormProps {
    onToggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        console.log('Attempting login with:', {
            username: formData.username,
            passwordLength: formData.password.length
        });

        try {
            await login(formData.username, formData.password);
            console.log('Login successful');
            // Successful login will be handled by the AuthContext
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.message || 'An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDemoLogin = (role: 'STUDENT' | 'COMPANY' | 'ADMIN') => {
        const demoCredentials = {
            STUDENT: { username: 'john_student', password: 'password123' },
            COMPANY: { username: 'tech_corp', password: 'password123' },
            ADMIN: { username: 'admin', password: 'admin123' },
        };

        console.log(`Setting demo credentials for ${role}`);
        setFormData(demoCredentials[role]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-8">
                    <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <LogIn className="w-8 h-8 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
                    <p className="text-gray-600 mt-2">Sign in to your account</p>
                </div>

                {error && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-600 text-sm">{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Username
                        </label>
                        <input
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors pr-12"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
                        </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                        {(['STUDENT', 'COMPANY', 'ADMIN'] as const).map((role) => (
                            <button
                                key={role}
                                onClick={() => handleDemoLogin(role)}
                                className="px-3 py-2 text-xs font-medium border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                {role}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{' '}
                        <button
                            onClick={onToggleForm}
                            className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;