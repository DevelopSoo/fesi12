// src/stores/useAuthStore.ts

import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  login: (email: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>()((set) => ({
  isAuthenticated: false,
  email: null,
  login: (email: string) => set({ isAuthenticated: true, email }),
  logout: () => set({ isAuthenticated: false, email: null }),
}));

export default useAuthStore;
