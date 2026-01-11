import { InferSelectModel } from "drizzle-orm";
import {
  sqliteTable,
  text,
  integer,
  real,
  index,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("emailVerified", { mode: "boolean" }).notNull(),
  image: text("image"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),
  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("accessToken"),
  refreshToken: text("refreshToken"),
  idToken: text("idToken"),
  accessTokenExpiresAt: integer("accessTokenExpiresAt", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refreshTokenExpiresAt", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updatedAt", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expiresAt", { mode: "timestamp" }).notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }),
  updatedAt: integer("updatedAt", { mode: "timestamp" }),
});

const nutritionColumnDefinitions = {
  // macronutrients
  calories: real("calories").notNull().default(0),
  protein: real("protein").notNull().default(0),
  carbs: real("carbs").notNull().default(0),
  fat: real("fat").notNull().default(0),

  // micronutrients
  fiber: real("fiber").notNull().default(0),

  saturatedFat: real("saturated_fat").notNull().default(0),
  omega3: real("omega_3").notNull().default(0),
  omega6: real("omega_6").notNull().default(0),

  // minerals
  sodium: real("sodium").notNull().default(0),
  potassium: real("potassium").notNull().default(0),
  calcium: real("calcium").notNull().default(0),
  iron: real("iron").notNull().default(0),
  magnesium: real("magnesium").notNull().default(0),
  zinc: real("zinc").notNull().default(0),

  // vitamins
  vitaminA: real("vitamin_a").notNull().default(0),
  vitaminC: real("vitamin_c").notNull().default(0),
  vitaminD: real("vitamin_d").notNull().default(0),
  vitaminE: real("vitamin_e").notNull().default(0),
  vitaminK: real("vitamin_k").notNull().default(0),
  vitaminB1: real("vitamin_b1").notNull().default(0),
  vitaminB2: real("vitamin_b2").notNull().default(0),
  vitaminB3: real("vitamin_b3").notNull().default(0),
  vitaminB5: real("vitamin_b5").notNull().default(0),
  vitaminB6: real("vitamin_b6").notNull().default(0),
  vitaminB9: real("vitamin_b9").notNull().default(0),
  vitaminB12: real("vitamin_b12").notNull().default(0),
};

export const foods = sqliteTable("foods", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  dataSource: text("data_source").notNull(),

  // nutrition
  ...nutritionColumnDefinitions,

  embedding: text("embedding"), // JSON-serialized float32 array for vector search
});

export const foodLog = sqliteTable(
  "food_log",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    // Store as unix timestamp (seconds) - SQLite friendly
    createdAt: integer("created_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),

    // Date string for easy daily queries: "2025-01-15"
    logDate: text("log_date").notNull(),

    // Meal context: "breakfast" | "lunch" | "dinner" | "snack"
    mealType: text("meal_type"),

    // The food items array as JSON
    items: text("items", { mode: "json" })
      .notNull()
      .$type<
        Omit<InferSelectModel<typeof foods>, "embedding" | "dataSource">[]
      >(),

    // Denormalized totals for this log entry (avoids re-summing JSON)
    calories: real("calories").notNull().default(0),
    protein: real("protein").notNull().default(0),
    carbs: real("carbs").notNull().default(0),
    fat: real("fat").notNull().default(0),
  },
  (table) => [
    index("idx_food_log_user_date").on(table.userId, table.logDate),
    index("idx_food_log_created_at").on(table.createdAt),
  ]
);

export const dailySummary = sqliteTable(
  "daily_summary",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    // "2025-01-15" format
    date: text("date").notNull(),

    // Aggregated totals
    ...nutritionColumnDefinitions,

    // Track when last updated
    updatedAt: integer("updated_at", { mode: "timestamp" })
      .notNull()
      .$defaultFn(() => new Date()),
  },
  (table) => [
    // Unique constraint: one summary per user per day
    uniqueIndex("idx_daily_summary_user_date").on(table.userId, table.date),
  ]
);
