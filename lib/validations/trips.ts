import * as z from "zod";

export const tripIntentSchema = z.object({
  destination: z.string().min(1, "请输入目的地"),
  duration: z.number().min(1).max(30),
  budgetRange: z.enum(["economy", "standard", "premium"]),
  travelers: z.object({
    adults: z.number().min(1),
    children: z.number().min(0),
  }),
  preferences: z.array(z.string()).min(1, "至少选择一个偏好"),
  pace: z.enum(["relaxed", "balanced", "intense"]),
  accommodationLevel: z.enum(["budget", "standard", "luxury"]),
  specialNeeds: z.array(z.string()).optional(),
});

export type TripIntent = z.infer<typeof tripIntentSchema>;