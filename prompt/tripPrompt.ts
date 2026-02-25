import transformIntent from "./transform";

function buildSystemPrompt() {
  return `
You are an expert AI travel planner. Generate a structured multi-day itinerary.

You MUST output valid JSON matching this exact schema (no extra fields, no commentary):

{
  "title": "string - trip title",
  "overview": "string - 2-4 sentence summary",
  "days": [
    {
      "day": 1,
      "title": "string - day theme",
      "activities": ["string", "string", ...],
      "accommodation": "optional string",
      "location": "optional string",
      "meals": { "breakfast": "optional", "lunch": "optional", "dinner": "optional" },
      "notes": "optional string"
    }
  ],
  "highlights": ["optional", "array", "of", "strings"]
}

Required: title, overview, days. Each day requires: day (number), title, activities (string[]).
Optional per day: accommodation, location, meals, notes. Optional root: highlights.
`;
}

function buildUserPrompt(intent: ReturnType<typeof transformIntent>) {
  return `
Travel Intent:

Location: ${intent.locationIntent ?? "AI to decide"}
Duration: ${intent.travelDurationDays} days
Group Type: ${intent.groupProfile.type}
Budget Level: ${intent.budgetProfile}
Experience Preferences: ${intent.experienceVector.join(", ")}
Pace: ${intent.pace}
Accommodation Level: ${intent.accommodationLevel}

Generate a complete itinerary in the exact JSON schema above. Output only the JSON object.
`;
}

export { buildSystemPrompt, buildUserPrompt };
