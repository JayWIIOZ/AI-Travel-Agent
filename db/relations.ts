import { relations } from "drizzle-orm";
import { users, trips, tripMembers, tripModules } from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
  tripMembers: many(tripMembers),
}));

export const tripsRelations = relations(trips, ({ many }) => ({
  members: many(tripMembers),
  modules: many(tripModules),
}));

export const tripMembersRelations = relations(tripMembers, ({ one }) => ({
  trip: one(trips, { fields: [tripMembers.tripId], references: [trips.id] }),
  user: one(users, { fields: [tripMembers.userId], references: [users.id] }),
}));

export const tripModulesRelations = relations(tripModules, ({ one }) => ({
  trip: one(trips, { fields: [tripModules.tripId], references: [trips.id] }),
}));
