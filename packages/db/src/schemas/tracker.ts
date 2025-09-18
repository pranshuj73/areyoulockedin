import { pgTable, text, timestamp, real, serial, uuid } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const timeEntry = pgTable("time-entry", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull().references(() => user.id, { onDelete: "cascade" }),
  userSecret: text("userSecret").notNull().references(() => user.userSecret, { onDelete: "cascade" }),
  timeSpent: real("timeSpent").notNull(),
  language: text("language").notNull(),
  timestamp: timestamp("timestamp").notNull(),
});
