import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

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

export const foods = sqliteTable("foods", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  dataSource: text("data_source").notNull(),
  calories: real("calories").notNull(),
  protein: real("protein").notNull(),
  carbs: real("carbs").notNull(),
  fat: real("fat").notNull(),
  fiber: real("fiber").notNull(),
  saturatedFat: real("saturated_fat").notNull(),
  omega3: real("omega_3").notNull(),
  omega6: real("omega_6").notNull(),
  sodium: real("sodium").notNull(),
  potassium: real("potassium").notNull(),
  calcium: real("calcium").notNull(),
  iron: real("iron").notNull(),
  magnesium: real("magnesium").notNull(),
  zinc: real("zinc").notNull(),
  vitaminA: real("vitamin_a").notNull(),
  vitaminC: real("vitamin_c").notNull(),
  vitaminD: real("vitamin_d").notNull(),
  vitaminE: real("vitamin_e").notNull(),
  vitaminK: real("vitamin_k").notNull(),
  vitaminB1: real("vitamin_b1").notNull(),
  vitaminB2: real("vitamin_b2").notNull(),
  vitaminB3: real("vitamin_b3").notNull(),
  vitaminB5: real("vitamin_b5").notNull(),
  vitaminB6: real("vitamin_b6").notNull(),
  vitaminB9: real("vitamin_b9").notNull(),
  vitaminB12: real("vitamin_b12").notNull(),
});
