import api from './client';

export interface UserProfile {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: 'STUDENT' | 'COMPANY' | 'ADMIN';
  university?: string;
  major?: string;
  graduationYear?: number;
  companyName?: string;
  industry?: string;
  website?: string;
  description?: string;
  enabled?: boolean;
  createdAt?: string;
}

// User profile endpoints
export const getCurrentUser = async () => {
  const { data } = await api.get<UserProfile>('/users/profile');
  return data;
};

export const updateProfile = async (profile: Partial<UserProfile>) => {
  const { data } = await api.put<UserProfile>('/users/profile', profile);
  return data;
};

export const uploadResume = async (file: File) => {
  const formData = new FormData();
  formData.append('resume', file);

  const { data } = await api.post('/users/upload-resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// Admin endpoints
export const getAllUsers = async (
  page = 0,
  size = 10,
  role?: 'STUDENT' | 'COMPANY' | 'ADMIN',
  search?: string
) => {
  const { data } = await api.get('/users/admin/all', {
    params: { page, size, role, search },
  });
  return data;
};

export const getUserById = async (id: number) => {
  const { data } = await api.get<UserProfile>(`/users/admin/${id}`);
  return data;
};

export const toggleUserStatus = async (id: number, enabled: boolean) => {
  const { data } = await api.put<UserProfile>(`/users/admin/${id}/enable`, null, {
    params: { enabled },
  });
  return data;
};

export const deleteUser = async (id: number) => {
  const { data } = await api.delete(`/users/admin/${id}`);
  return data;
}; 