DO $$ BEGIN
 CREATE TYPE "weightUnit" AS ENUM('lbs', 'kg');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TYPE "status" ADD VALUE 'not_started';--> statement-breakpoint
ALTER TYPE "status" ADD VALUE 'incomplete';--> statement-breakpoint
ALTER TYPE "status" ADD VALUE 'finished';--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cardioExercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"description" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cardio" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"routine_id" integer,
	"cardio_exercise_id" integer,
	"duration" integer,
	"distance" integer,
	"date" varchar(256),
	"notes" varchar(256),
	"created_at" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "templateCardio" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"routine_id" integer,
	"cardio_exercise_id" integer,
	"notes" varchar(256),
	"status" "status",
	"frequency" "frequency",
	"durationType" "durationType",
	"durationValue" integer,
	"created_at" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "templateWorkoutCardio" (
	"id" serial PRIMARY KEY NOT NULL,
	"templateWorkout_id" integer,
	"cardio_exercise_id" integer,
	"duration" integer,
	"distance" integer,
	"order_index" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workoutCardio" (
	"id" serial PRIMARY KEY NOT NULL,
	"cardio_id" integer,
	"workout_id" integer,
	"order_index" integer
);
--> statement-breakpoint
ALTER TABLE "templateWorkoutSchedules" RENAME TO "templateSchedules";--> statement-breakpoint
ALTER TABLE "workoutExerciseSets" RENAME COLUMN "user_input" TO "notes";--> statement-breakpoint
ALTER TABLE "workouts" RENAME COLUMN "description" TO "notes";--> statement-breakpoint
ALTER TABLE "templateSchedules" DROP CONSTRAINT "templateWorkoutSchedules_templateWorkout_id_templateWorkouts_id_fk";
--> statement-breakpoint
ALTER TABLE "workoutExerciseSets" ALTER COLUMN "weight_unit" SET DATA TYPE weightUnit;--> statement-breakpoint
ALTER TABLE "workouts" ALTER COLUMN "status" SET DATA TYPE status;--> statement-breakpoint
ALTER TABLE "workouts" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "templateSchedules" ALTER COLUMN "templateWorkout_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "templateSchedules" ALTER COLUMN "daysOfWeek" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "templateSchedules" ADD COLUMN "templateCardio_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateSchedules" ADD CONSTRAINT "templateSchedules_templateWorkout_id_templateWorkouts_id_fk" FOREIGN KEY ("templateWorkout_id") REFERENCES "templateWorkouts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateSchedules" ADD CONSTRAINT "templateSchedules_templateCardio_id_templateCardio_id_fk" FOREIGN KEY ("templateCardio_id") REFERENCES "templateCardio"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cardio" ADD CONSTRAINT "cardio_routine_id_routines_id_fk" FOREIGN KEY ("routine_id") REFERENCES "routines"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cardio" ADD CONSTRAINT "cardio_cardio_exercise_id_cardioExercises_id_fk" FOREIGN KEY ("cardio_exercise_id") REFERENCES "cardioExercises"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateCardio" ADD CONSTRAINT "templateCardio_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateCardio" ADD CONSTRAINT "templateCardio_routine_id_routines_id_fk" FOREIGN KEY ("routine_id") REFERENCES "routines"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateCardio" ADD CONSTRAINT "templateCardio_cardio_exercise_id_cardioExercises_id_fk" FOREIGN KEY ("cardio_exercise_id") REFERENCES "cardioExercises"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateWorkoutCardio" ADD CONSTRAINT "templateWorkoutCardio_templateWorkout_id_templateWorkouts_id_fk" FOREIGN KEY ("templateWorkout_id") REFERENCES "templateWorkouts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateWorkoutCardio" ADD CONSTRAINT "templateWorkoutCardio_cardio_exercise_id_cardioExercises_id_fk" FOREIGN KEY ("cardio_exercise_id") REFERENCES "cardioExercises"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workoutCardio" ADD CONSTRAINT "workoutCardio_cardio_id_cardio_id_fk" FOREIGN KEY ("cardio_id") REFERENCES "cardio"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workoutCardio" ADD CONSTRAINT "workoutCardio_workout_id_workouts_id_fk" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
