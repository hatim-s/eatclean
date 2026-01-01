import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import * as schema from "@/db/schema";

export type User = InferSelectModel<typeof schema.user>;
export type NewUser = InferInsertModel<typeof schema.user>;

export type Session = InferSelectModel<typeof schema.session>;
export type NewSession = InferInsertModel<typeof schema.session>;

export type Account = InferSelectModel<typeof schema.account>;
export type NewAccount = InferInsertModel<typeof schema.account>;

export type Verification = InferSelectModel<typeof schema.verification>;
export type NewVerification = InferInsertModel<typeof schema.verification>;

export type FoodItem = InferSelectModel<typeof schema.foods>;
export type NewFoodItem = InferInsertModel<typeof schema.foods>;
