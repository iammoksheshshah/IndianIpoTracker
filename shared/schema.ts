import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const ipos = pgTable("ipos", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  scriptCode: text("script_code").notNull(),
  iconUrl: text("icon_url"),
  minPrice: decimal("min_price", { precision: 10, scale: 2 }),
  maxPrice: decimal("max_price", { precision: 10, scale: 2 }),
  lotSize: integer("lot_size"),
  premium: text("premium"),
  premiumPercentage: decimal("premium_percentage", { precision: 5, scale: 2 }),
  openDate: text("open_date").notNull(),
  closeDate: text("close_date").notNull(),
  allotmentDate: text("allotment_date"),
  listingDate: text("listing_date"),
  allotmentLink: text("allotment_link"),
  currentStatus: text("current_status").notNull(), // 'open', 'upcoming', 'closed'
  exchange: text("exchange"), // 'MAINBOARD', 'BSE SME', 'NSE SME'
  premiumLastUpdated: timestamp("premium_last_updated"),
  listingPrice: decimal("listing_price", { precision: 10, scale: 2 }),
  isBuyer: boolean("is_buyer").default(false),
  isSeller: boolean("is_seller").default(false),
  isPreApply: boolean("is_pre_apply").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertIpoSchema = createInsertSchema(ipos).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertIpo = z.infer<typeof insertIpoSchema>;
export type Ipo = typeof ipos.$inferSelect;

// Contact form schema
export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertContactSchema = createInsertSchema(contacts).omit({
  id: true,
  createdAt: true,
});

export type InsertContact = z.infer<typeof insertContactSchema>;
export type Contact = typeof contacts.$inferSelect;

// Users table (keeping existing)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
