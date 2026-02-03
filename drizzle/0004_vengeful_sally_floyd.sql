CREATE TABLE `daily_summary` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`date` text NOT NULL,
	`calories` real DEFAULT 0 NOT NULL,
	`protein` real DEFAULT 0 NOT NULL,
	`carbs` real DEFAULT 0 NOT NULL,
	`fat` real DEFAULT 0 NOT NULL,
	`fiber` real DEFAULT 0 NOT NULL,
	`saturated_fat` real DEFAULT 0 NOT NULL,
	`omega_3` real DEFAULT 0 NOT NULL,
	`omega_6` real DEFAULT 0 NOT NULL,
	`sodium` real DEFAULT 0 NOT NULL,
	`potassium` real DEFAULT 0 NOT NULL,
	`calcium` real DEFAULT 0 NOT NULL,
	`iron` real DEFAULT 0 NOT NULL,
	`magnesium` real DEFAULT 0 NOT NULL,
	`zinc` real DEFAULT 0 NOT NULL,
	`vitamin_a` real DEFAULT 0 NOT NULL,
	`vitamin_c` real DEFAULT 0 NOT NULL,
	`vitamin_d` real DEFAULT 0 NOT NULL,
	`vitamin_e` real DEFAULT 0 NOT NULL,
	`vitamin_k` real DEFAULT 0 NOT NULL,
	`vitamin_b1` real DEFAULT 0 NOT NULL,
	`vitamin_b2` real DEFAULT 0 NOT NULL,
	`vitamin_b3` real DEFAULT 0 NOT NULL,
	`vitamin_b5` real DEFAULT 0 NOT NULL,
	`vitamin_b6` real DEFAULT 0 NOT NULL,
	`vitamin_b9` real DEFAULT 0 NOT NULL,
	`vitamin_b12` real DEFAULT 0 NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);--> statement-breakpoint
CREATE UNIQUE INDEX `idx_daily_summary_user_date` ON `daily_summary` (`user_id`,`date`);--> statement-breakpoint
CREATE TABLE `food_log` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`created_at` integer NOT NULL,
	`log_date` text NOT NULL,
	`meal_type` text,
	`items` text NOT NULL,
	`calories` real DEFAULT 0 NOT NULL,
	`protein` real DEFAULT 0 NOT NULL,
	`carbs` real DEFAULT 0 NOT NULL,
	`fat` real DEFAULT 0 NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);--> statement-breakpoint
CREATE INDEX `idx_food_log_user_date` ON `food_log` (`user_id`,`log_date`);--> statement-breakpoint
CREATE INDEX `idx_food_log_created_at` ON `food_log` (`created_at`);--> statement-breakpoint
DROP INDEX "idx_daily_summary_user_date";--> statement-breakpoint
DROP INDEX "idx_food_log_user_date";--> statement-breakpoint
DROP INDEX "idx_food_log_created_at";--> statement-breakpoint
DROP INDEX "session_token_unique";--> statement-breakpoint
DROP INDEX "user_email_unique";--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "calories" TO "calories" real NOT NULL DEFAULT 0;--> statement-breakpoint
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "protein" TO "protein" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "carbs" TO "carbs" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "fat" TO "fat" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "fiber" TO "fiber" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "saturated_fat" TO "saturated_fat" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "omega_3" TO "omega_3" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "omega_6" TO "omega_6" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "sodium" TO "sodium" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "potassium" TO "potassium" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "calcium" TO "calcium" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "iron" TO "iron" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "magnesium" TO "magnesium" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "zinc" TO "zinc" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "vitamin_a" TO "vitamin_a" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "vitamin_c" TO "vitamin_c" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "vitamin_d" TO "vitamin_d" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "vitamin_e" TO "vitamin_e" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "vitamin_k" TO "vitamin_k" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "vitamin_b1" TO "vitamin_b1" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "vitamin_b2" TO "vitamin_b2" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "vitamin_b3" TO "vitamin_b3" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "vitamin_b5" TO "vitamin_b5" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "vitamin_b6" TO "vitamin_b6" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "vitamin_b9" TO "vitamin_b9" real NOT NULL DEFAULT 0;--> statement-breakpoint
ALTER TABLE `foods` ALTER COLUMN "vitamin_b12" TO "vitamin_b12" real NOT NULL DEFAULT 0;