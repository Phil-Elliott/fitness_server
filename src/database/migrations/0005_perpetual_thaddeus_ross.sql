DO $$ BEGIN
 CREATE TYPE "routineStatus" AS ENUM('active', 'inactive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "templateCardioStatus" AS ENUM('active', 'inactive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "templateWorkoutStatus" AS ENUM('active', 'inactive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "workoutStatus" AS ENUM('not_started', 'incomplete', 'finished');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "routines" RENAME COLUMN "status" TO "routineStatus";--> statement-breakpoint
ALTER TABLE "templateCardio" RENAME COLUMN "status" TO "templateCardioStatus";--> statement-breakpoint
ALTER TABLE "templateWorkouts" RENAME COLUMN "status" TO "templateWorkoutStatus";--> statement-breakpoint
ALTER TABLE "workouts" RENAME COLUMN "status" TO "workoutStatus";--> statement-breakpoint
ALTER TABLE "routines" ALTER COLUMN "routineStatus" SET DATA TYPE routineStatus;--> statement-breakpoint
ALTER TABLE "templateCardio" ALTER COLUMN "templateCardioStatus" SET DATA TYPE templateCardioStatus;--> statement-breakpoint
ALTER TABLE "templateWorkouts" ALTER COLUMN "templateWorkoutStatus" SET DATA TYPE templateWorkoutStatus;--> statement-breakpoint
ALTER TABLE "workouts" ALTER COLUMN "workoutStatus" SET DATA TYPE workoutStatus;--> statement-breakpoint
ALTER TABLE "workoutExerciseSets" ADD COLUMN "weightUnit" "weightUnit";--> statement-breakpoint
ALTER TABLE "workoutExerciseSets" DROP COLUMN IF EXISTS "weight_unit";