import {
  pgTable,
  uuid,
  text,
  timestamp,
  integer,
  boolean,
  varchar,
  jsonb,
  primaryKey,
  pgEnum,
} from "drizzle-orm/pg-core";
import { users } from "./users";

// --- 枚举定义 ---
export const tripStatusEnum = pgEnum("trip_status", [
  "planning",
  "ongoing",
  "completed",
  "cancelled",
]);
export const roleEnum = pgEnum("member_role", ["owner", "editor", "viewer"]);
export const moduleTypeEnum = pgEnum("module_type", [
  "flight",
  "hotel",
  "activity",
  "transport",
  "dining",
]);

// --- 旅行主表 (Trips) ---
export const trips = pgTable("trips", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  destination: varchar("destination", { length: 255 }),
  status: tripStatusEnum("status").default("planning"),
  isPublic: boolean("is_public").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// --- 协作成员表 (Trip Members) ---
export const tripMembers = pgTable(
  "trip_members",
  {
    tripId: uuid("trip_id").references(() => trips.id, { onDelete: "cascade" }),
    userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
    role: roleEnum("role").default("viewer"),
    joinedAt: timestamp("joined_at").defaultNow(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.tripId, table.userId] }),
  }),
);

// --- 旅行模块/项 (Trip Modules) ---
export const tripModules = pgTable("trip_modules", {
  id: uuid("id").primaryKey().defaultRandom(),
  tripId: uuid("trip_id")
    .references(() => trips.id, { onDelete: "cascade" })
    .notNull(),

  type: moduleTypeEnum("type").notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  startTime: timestamp("start_time", { withTimezone: true }),
  endTime: timestamp("end_time", { withTimezone: true }),

  locationName: varchar("location_name", { length: 255 }),
  latitude: text("latitude"),
  longitude: text("longitude"),
  address: text("address"),

  sortOrder: integer("sort_order").notNull().default(0),

  metadata: jsonb("metadata").$type<{
    confirmationNumber?: string;
    flightNumber?: string;
    airline?: string;
    phoneNumber?: string;
    bookingUrl?: string;
    cost?: number;
    currency?: string;
  }>(),

  notes: text("notes"),
  isCompleted: boolean("is_completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});
