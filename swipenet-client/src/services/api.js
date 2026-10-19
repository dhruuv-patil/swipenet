import axios from 'axios';

const rawApiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const API_BASE_URL = rawApiUrl.endsWith('/api')
  ? rawApiUrl
  : `${rawApiUrl.replace(/\/+$/, '')}/api`;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Automatically inject JWT token into requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response error handler
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired or invalid
      console.warn('Session expired or unauthorized');
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getProfile: () => api.get('/auth/profile'),
};

export const userApi = {
  getAllUsers: () => api.get('/users/all'),
  getUserById: (id) => api.get(`/users/${id}`),
  updateProfile: (data) => api.put('/users/update', data),
};

export const matchApi = {
  swipeRight: (id) => api.post(`/matches/right/${id}`),
  swipeLeft: (id) => api.post(`/matches/left/${id}`),
  getMatches: () => api.get('/matches/my-matches'),
};

export const chatApi = {
  getMessages: (matchId) => api.get(`/chats/with/${matchId}`),
  sendMessage: (matchId, content) => api.post('/chats/send', { matchId, content }),
};

export default api;
