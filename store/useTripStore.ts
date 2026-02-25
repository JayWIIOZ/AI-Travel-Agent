import { create } from "zustand";
import { arrayMove } from "@dnd-kit/sortable";
import { TripModule, ModuleType } from "@/types/trips";

interface TripState {
  modules: TripModule[];
  activeModuleId: string | null;
  setModules: (modules: TripModule[]) => void;
  setActiveModule: (id: string | null) => void;
  updateModule: (id: string, updates: Partial<TripModule>) => void;
  addModule: (type: ModuleType) => void;
  reorderModules: (activeId: string, overId: string) => void;
}

export const useTripStore = create<TripState>((set) => ({
  modules: [],
  activeModuleId: null,
  setModules: (modules) => set({ modules }),
  setActiveModule: (id) => set({ activeModuleId: id }),
  updateModule: (id, updates) =>
    set((state) => ({
      modules: state.modules.map((m) =>
        m.id === id ? { ...m, ...updates } : m,
      ),
    })),
  addModule: (type) =>
    set((state) => ({
      modules: [
        ...state.modules,
        {
          id: crypto.randomUUID(),
          type,
          title: `New ${type}`,
          content: "", // Markdown 内容
          metadata: {},
          sortOrder: state.modules.length,
        } as any,
      ],
    })),
  reorderModules: (activeId, overId) =>
    set((state) => {
      const oldIndex = state.modules.findIndex((m) => m.id === activeId);
      const newIndex = state.modules.findIndex((m) => m.id === overId);
      return { modules: arrayMove(state.modules, oldIndex, newIndex) };
    }),
}));
