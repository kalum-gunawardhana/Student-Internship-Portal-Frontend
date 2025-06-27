import api from './client';

export interface LoginResponse {
  token: string;
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: 'STUDENT' | 'COMPANY' | 'ADMIN';
}

export interface LoginRequest {
  username?: string;
  usernameOrEmail?: string;
  password: string;
}

export const loginApi = async (username: string, password: string): Promise<LoginResponse> => {
  try {
    console.log('Login Request:', { username, password });
    
    const response = await api.post<LoginResponse>('/auth/signin', {
      // Support both possible backend field names
      username,
      usernameOrEmail: username,
      password,
    });
    
    console.log('Login Response:', response.data);
    
    // Validate the response
    if (!response.data || !response.data.token) {
      throw new Error('Invalid response from server: missing token');
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Login Error:', error.response ? {
      status: error.response.status,
      data: error.response.data,
      headers: error.response.headers
    } : error);

    if (error.response) {
      // Handle specific error cases
      if (error.response.status === 401) {
        throw new Error('Invalid username or password');
      } else if (error.response.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error('Authentication failed');
      }
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection.');
    } else {
      throw new Error('Error setting up the request');
    }
  }
};

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  fullName: string;
  role?: 'STUDENT' | 'COMPANY' | 'ADMIN';
  // additional optional fields
  university?: string;
  major?: string;
  graduationYear?: number;
  companyName?: string;
  industry?: string;
  website?: string;
  description?: string;
}

export interface RegisterResponse {
  message: string;
  user: {
    id: number;
    username: string;
    email: string;
    fullName: string;
    role: 'STUDENT' | 'COMPANY' | 'ADMIN';
  };
}

export const registerApi = async (payload: RegisterPayload): Promise<RegisterResponse> => {
  try {
    console.log('Register Request:', payload);
    const response = await api.post<RegisterResponse>('/auth/signup', payload);
    console.log('Register Response:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Register Error:', error.response ? {
      status: error.response.status,
      data: error.response.data
    } : error);

    if (error.response) {
      throw new Error(error.response.data.message || 'Registration failed');
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error('Error setting up the request');
    }
  }
};

export const logout = () => {
  localStorage.removeItem('jwt_token');
  // Optionally, you can also make a call to the backend to invalidate the token
  // await api.post('/auth/signout');
}; 