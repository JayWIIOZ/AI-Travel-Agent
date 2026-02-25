import { create } from "zustand";
import type { GeneratedItinerary } from "@/types/itinerary";

interface GeneratedItineraryState {
  itinerary: GeneratedItinerary | null;
  setItinerary: (itinerary: GeneratedItinerary | null) => void;
  clear: () => void;
}

export const useGeneratedItineraryStore = create<GeneratedItineraryState>((set) => ({
  itinerary: null,
  setItinerary: (itinerary) => set({ itinerary }),
  clear: () => set({ itinerary: null }),
}));
