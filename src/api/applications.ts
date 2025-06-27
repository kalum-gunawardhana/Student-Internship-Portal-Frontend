import api from './client';

export interface ApplicationRequest {
  internshipPostId: number;
  coverLetter?: string;
}

// Student endpoints
export const applyForInternship = async (request: ApplicationRequest) => {
  const { data } = await api.post('/applications/student/apply', request);
  return data;
};

export const applyWithResume = async (
  internshipPostId: number,
  resume: File,
  coverLetter?: string
) => {
  const formData = new FormData();
  formData.append('internshipPostId', internshipPostId.toString());
  formData.append('resume', resume);
  if (coverLetter) {
    formData.append('coverLetter', coverLetter);
  }

  const { data } = await api.post('/applications/student/apply-with-resume', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

export const getMyApplications = async (page = 0, size = 10) => {
  const { data } = await api.get('/applications/student/my', {
    params: { page, size },
  });
  return data;
};

export const withdrawApplication = async (id: number) => {
  const { data } = await api.put(`/applications/student/${id}/withdraw`);
  return data;
};

// Company endpoints
export const getReceivedApplications = async (
  page = 0,
  size = 10,
  status?: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN'
) => {
  const { data } = await api.get('/applications/company/received', {
    params: { page, size, status },
  });
  return data;
};

export const getApplicationsForInternship = async (
  internshipId: number,
  page = 0,
  size = 10
) => {
  const { data } = await api.get(`/applications/company/internship/${internshipId}`, {
    params: { page, size },
  });
  return data;
};

export const updateApplicationStatus = async (
  id: number,
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED'
) => {
  const { data } = await api.put(`/applications/company/${id}/status`, null, {
    params: { status },
  });
  return data;
};

// Admin endpoints
export const getAllApplications = async (
  page = 0,
  size = 10,
  status?: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN'
) => {
  const { data } = await api.get('/applications/admin/all', {
    params: { page, size, status },
  });
  return data;
}; 