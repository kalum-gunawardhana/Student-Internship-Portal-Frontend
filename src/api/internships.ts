import api from './client';

export interface InternshipPostRequest {
  title: string;
  description: string;
  location: string;
  requirements: string;
  responsibilities: string;
  salary?: string;
  startDate?: string;
  endDate?: string;
  applicationDeadline?: string;
  type?: string;
  isRemote?: boolean;
}

// Public endpoints
export const fetchActiveInternships = async (params?: {
  page?: number;
  size?: number;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  search?: string;
  location?: string;
}) => {
  const { data } = await api.get('/internships/public', { params });
  return data;
};

export const fetchInternshipById = async (id: number) => {
  const { data } = await api.get(`/internships/public/${id}`);
  return data;
};

// Company endpoints
export const createInternship = async (request: InternshipPostRequest) => {
  const { data } = await api.post('/internships/company', request);
  return data;
};

export const getMyInternships = async (page = 0, size = 10) => {
  const { data } = await api.get('/internships/company/my', {
    params: { page, size },
  });
  return data;
};

export const updateInternship = async (id: number, request: InternshipPostRequest) => {
  const { data } = await api.put(`/internships/company/${id}`, request);
  return data;
};

export const updateInternshipStatus = async (
  id: number,
  status: 'DRAFT' | 'PUBLISHED' | 'CLOSED' | 'DELETED'
) => {
  const { data } = await api.put(`/internships/company/${id}/status`, null, {
    params: { status },
  });
  return data;
};

export const deleteInternship = async (id: number) => {
  const { data } = await api.delete(`/internships/company/${id}`);
  return data;
};

// Admin endpoints
export const getAllInternships = async (
  page = 0,
  size = 10,
  status?: 'DRAFT' | 'PUBLISHED' | 'CLOSED' | 'DELETED'
) => {
  const { data } = await api.get('/internships/admin/all', {
    params: { page, size, status },
  });
  return data;
};

export const adminUpdateInternshipStatus = async (
  id: number,
  status: 'DRAFT' | 'PUBLISHED' | 'CLOSED' | 'DELETED'
) => {
  const { data } = await api.put(`/internships/admin/${id}/status`, null, {
    params: { status },
  });
  return data;
}; 