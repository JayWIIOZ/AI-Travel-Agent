import { TripIntent } from "@/lib/validations/trips";

const transformIntent = (data: TripIntent) => {
    return {
      locationIntent: data.destination || null,
      travelDurationDays: data.duration,
      groupProfile: {
        adults: data.travelers.adults,
        children: data.travelers.children,
        type:
          data.travelers.children > 0
            ? "family"
            : data.travelers.adults === 1
            ? "solo"
            : "couple_or_group",
      },
      budgetProfile: data.budgetRange,
      experienceVector: data.preferences,
      pace: data.pace,
      accommodationLevel: data.accommodationLevel,
    };
  }

export default transformIntent;