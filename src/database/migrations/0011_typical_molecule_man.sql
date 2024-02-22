ALTER TABLE "cardio" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "routines" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "templateCardio" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "templateWorkouts" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "workoutExerciseSets" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "workouts" DROP COLUMN IF EXISTS "created_at";