// src/lib/apiClient.ts   (or src/lib/api/client.ts)

import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,


  withCredentials: true,

});


if (typeof window !== 'undefined') {
  apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {

        
        window.location.href = '/user-login'; 
      }
      return Promise.reject(error);
    }
  );
}

export default apiClient; 