ALTER TABLE "routines" RENAME COLUMN "description" TO "notes";--> statement-breakpoint
ALTER TABLE "templateWorkouts" RENAME COLUMN "description" TO "notes";--> statement-breakpoint
ALTER TABLE "cardioExercises" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "cardioExercises" ALTER COLUMN "description" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "cardio" ALTER COLUMN "user_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "cardio" ALTER COLUMN "date" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "cardio" ALTER COLUMN "date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "cardio" ALTER COLUMN "notes" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "cardio" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "cardio" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "exercises" ALTER COLUMN "description" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "routines" ALTER COLUMN "routine_status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "routines" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "routines" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "routines" ALTER COLUMN "notes" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "templateCardio" ALTER COLUMN "notes" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "templateCardio" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "templateSchedules" ALTER COLUMN "start_time" SET DATA TYPE time with time zone;--> statement-breakpoint
ALTER TABLE "templateWorkouts" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "templateWorkouts" ALTER COLUMN "notes" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "workoutExerciseSets" ALTER COLUMN "notes" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "workoutExerciseSets" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "workoutExerciseSets" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "workouts" ALTER COLUMN "notes" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "workouts" ALTER COLUMN "date" SET DATA TYPE date;--> statement-breakpoint
ALTER TABLE "workouts" ALTER COLUMN "date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "workouts" ALTER COLUMN "created_at" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "routines" ADD COLUMN "start_date" date NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cardio" ADD CONSTRAINT "cardio_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "templateSchedules" DROP COLUMN IF EXISTS "end_time";