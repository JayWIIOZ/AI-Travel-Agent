import { create } from "zustand";

interface GenerateState {
  isSubmitting: boolean;
  setSubmitting: (v: boolean) => void;
}

export const useGenerateStore = create<GenerateState>((set) => ({
  isSubmitting: false,
  setSubmitting: (v) => set({ isSubmitting: v }),
}));
