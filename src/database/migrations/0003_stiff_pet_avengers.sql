DO $$ BEGIN
 CREATE TYPE "durationType" AS ENUM('days', 'weeks', 'months');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "frequency" AS ENUM('daily', 'weekly', 'biweekly', 'monthly');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "status" AS ENUM('active', 'inactive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "daysOfWeek" AS ENUM('Day1', 'Day2', 'Day3', 'Day4', 'Day5', 'Day6', 'Day7');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
