import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  // Theme
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Navigation
  // (Navigation is now handled via Next.js router)

  // Generation Mode
  mode: 'Image' | 'Video';
  setMode: (mode: 'Image' | 'Video') => void;

  // Prompt
  prompt: string;
  setPrompt: (prompt: string) => void;

  // Generation state
  isGenerating: boolean;
  setGenerating: (v: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),



      mode: 'Image',
      setMode: (mode) => set({ mode }),

      prompt: '',
      setPrompt: (prompt) => set({ prompt }),

      isGenerating: false,
      setGenerating: (v) => set({ isGenerating: v }),
    }),
    {
      name: 'ai-gen-store',
      partialize: (s) => ({ theme: s.theme }),
    }
  )
);
