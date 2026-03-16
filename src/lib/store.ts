import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types";
import { authApi } from "@/lib/api";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loadUser: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isLoading: false,

      login: async (email, password) => {
        set({ isLoading: true });
        const { data } = await authApi.login(email, password);
        localStorage.setItem("sb_access_token", data.access_token);
        localStorage.setItem("sb_refresh_token", data.refresh_token);
        set({ accessToken: data.access_token, isLoading: false });
        const me = await authApi.me();
        set({ user: me.data });
      },

      logout: async () => {
        await authApi.logout().catch(() => {});
        localStorage.removeItem("sb_access_token");
        localStorage.removeItem("sb_refresh_token");
        set({ user: null, accessToken: null });
      },

      loadUser: async () => {
        try {
          const { data } = await authApi.me();
          set({ user: data });
        } catch {
          set({ user: null });
        }
      },
    }),
    { name: "sb-auth", partialize: (s) => ({ user: s.user }) }
  )
);
