import { pgTable, uuid, text, timestamp, varchar, jsonb } from "drizzle-orm/pg-core";
import type { GeneratedItinerary } from "@/types/itinerary";

/** 保存的行程笔记（AI 生成后用户保存到收藏） */
export const itineraryNotes = pgTable("itinerary_notes", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  overview: text("overview"),
  /** 完整行程结构 JSON，与 GeneratedItinerary 一一对应 */
  payload: jsonb("payload").$type<GeneratedItinerary>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
