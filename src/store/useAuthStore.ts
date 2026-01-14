import { create } from 'zustand';
import { env } from 'next-runtime-env';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email, password) => {
    const user = {
      id: '1',
      name: 'John Doe',
      email,
      role: 'admin',
    };
    set({ user, isAuthenticated: true });
  },

  logout: async () => {
    console.log('Logging out user');
    try {
      const AUTH_BASE_URL = env('NEXT_PUBLIC_API_URL');
      await fetch(`${AUTH_BASE_URL}/auth/users/logout`, {
        method: 'POST',
        credentials: 'include', 
      });

      set({ user: null, isAuthenticated: false });

      document.cookie.split(';').forEach((c) => {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
      });
      
    } catch (error) {
      console.error('Logout failed:', error);
    }
  },

  setUser: (user) => {
    set({ user, isAuthenticated: true });
  },
}));
