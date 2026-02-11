import { pgTable, text, timestamp, doublePrecision, boolean, integer, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: text("id").primaryKey(), // Clerk ID
    email: text("email").notNull(),
    dailyGoal: integer("daily_goal").default(2500).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const customFoods = pgTable("custom_foods", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
    name: text("name").notNull(),
    type: text("type", { enum: ["raw", "cooked"] }).notNull(),
    caloriesPer100g: doublePrecision("calories_per_100g").notNull(),
    proteinPer100g: doublePrecision("protein_per_100g").default(0).notNull(),
    isDeleted: boolean("is_deleted").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const dailyLogs = pgTable("daily_logs", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
    foodName: text("food_name").notNull(),
    type: text("type", { enum: ["raw", "cooked"] }).notNull(),
    weight: doublePrecision("weight").notNull(),
    calories: doublePrecision("calories").notNull(),
    protein: doublePrecision("protein").default(0).notNull(),
    date: timestamp("date").defaultNow().notNull(), // Exact timestamp for ordering
});

export const recipes = pgTable("recipes", {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: text("user_id").notNull().references(() => users.id, { onDelete: 'cascade' }),
    name: text("name").notNull(),
    totalCalories: doublePrecision("total_calories").notNull(),
    ingredients: text("ingredients").notNull(), // JSON stringified list of ingredients
    isDeleted: boolean("is_deleted").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
});
