import { z } from "zod";

/** 当日餐饮（与 schema 一一对应） */
export const dayMealsSchema = z.object({
  breakfast: z.string().optional(),
  lunch: z.string().optional(),
  dinner: z.string().optional(),
});

/** 单日行程（与 AI 输出 schema 一一对应） */
export const generatedDaySchema = z.object({
  day: z.number().int().positive(),
  title: z.string(),
  activities: z.array(z.string()),
  accommodation: z.string().optional(),
  location: z.string().optional(),
  meals: dayMealsSchema.optional(),
  notes: z.string().optional(),
});

/** 完整行程（与 AI 输出 schema 一一对应） */
export const generatedItinerarySchema = z.object({
  title: z.string(),
  overview: z.string(),
  days: z.array(generatedDaySchema),
  highlights: z.array(z.string()).optional(),
});

export type DayMeals = z.infer<typeof dayMealsSchema>;
export type GeneratedDay = z.infer<typeof generatedDaySchema>;
export type GeneratedItinerary = z.infer<typeof generatedItinerarySchema>;

/** 仅当 API 返回 text 时做兜底解析（如旧版或非 generateObject 调用） */
export function parseItineraryFromText(text: string): GeneratedItinerary | null {
  let raw = text.trim();
  const codeBlock = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlock) raw = codeBlock[1].trim();
  try {
    const data = JSON.parse(raw) as unknown;
    const parsed = generatedItinerarySchema.safeParse(data);
    return parsed.success ? parsed.data : null;
  } catch {
    return null;
  }
}
