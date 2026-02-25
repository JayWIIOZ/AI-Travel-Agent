export interface TravelIntent {
  destination?: string; // 可选，允许AI推荐
  preferences: PreferenceTag[];
  budgetRange: BudgetRange;
  travelers: {
    adults: number;
    children: number;
  };
  duration: number;
  transportation?: Transportation[];
  accommodationLevel?: AccommodationLevel;
  pace?: "relaxed" | "balanced" | "intense";
  specialNeeds?: string[];
  extraNotes?: string;
}

type PreferenceTag =
  | "Cluture Explore"
  | "Natural Scenery"
  | "Food Journey"
  | "Family Leisure"
  | "Extreme Sports"
  | "Shopping Paradise"
  | "Art & Culture"
  | "History & Heritage"
  | "Relaxation & Spa"
  | "Adventure & Exploration"
  | "Romance & Honeymoon"
  | "Business & Professional"
  | "Health & Wellness"
  | "Family & Kids";

type BudgetRange = "Low" | "Medium" | "High";

type Transportation =
  | "Plane"
  | "Train"
  | "Car"
  | "Ship"
  | "Subway"
  | "Bus"
  | "Hiking"
  | "Bicycle"
  | "Motorcycle"
  | "Other";

type AccommodationLevel = "Economy" | "Medium" | "Luxury";
