DO $$ BEGIN
 CREATE TYPE "duration_type" AS ENUM('days', 'weeks', 'months');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "routine_status" AS ENUM('active', 'inactive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "template_cardio_status" AS ENUM('active', 'inactive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "template_workout_status" AS ENUM('active', 'inactive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "weight_unit" AS ENUM('lbs', 'kg');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "workout_status" AS ENUM('not_started', 'incomplete', 'finished');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "routines" RENAME COLUMN "routineStatus" TO "routine_status";--> statement-breakpoint
ALTER TABLE "routines" RENAME COLUMN "durationType" TO "duration_type";--> statement-breakpoint
ALTER TABLE "routines" RENAME COLUMN "duration" TO "duration_value";--> statement-breakpoint
ALTER TABLE "templateCardio" RENAME COLUMN "templateCardioStatus" TO "template_cardio_status";--> statement-breakpoint
ALTER TABLE "templateCardio" RENAME COLUMN "durationType" TO "duration_type";--> statement-breakpoint
ALTER TABLE "templateCardio" RENAME COLUMN "durationValue" TO "duration_value";--> statement-breakpoint
ALTER TABLE "templateSchedules" RENAME COLUMN "templateWorkout_id" TO "template_workout_id";--> statement-breakpoint
ALTER TABLE "templateSchedules" RENAME COLUMN "templateCardio_id" TO "template_cardio_id";--> statement-breakpoint
ALTER TABLE "templateSchedules" RENAME COLUMN "daysOfWeek" TO "day_of_week";--> statement-breakpoint
ALTER TABLE "templateSchedules" RENAME COLUMN "startTime" TO "start_time";--> statement-breakpoint
ALTER TABLE "templateSchedules" RENAME COLUMN "endTime" TO "end_time";--> statement-breakpoint
ALTER TABLE "templateWorkoutCardio" RENAME COLUMN "templateWorkout_id" TO "template_workout_id";--> statement-breakpoint
ALTER TABLE "templateWorkoutExercises" RENAME COLUMN "templateWorkout_id" TO "template_workout_id";--> statement-breakpoint
ALTER TABLE "templateWorkoutExercises" RENAME COLUMN "restBetweenSets" TO "rest_between_sets";--> statement-breakpoint
ALTER TABLE "templateWorkouts" RENAME COLUMN "restBetweenSets" TO "rest_between_exercises";--> statement-breakpoint
ALTER TABLE "templateWorkouts" RENAME COLUMN "templateWorkoutStatus" TO "template_workout_status";--> statement-breakpoint
ALTER TABLE "templateWorkouts" RENAME COLUMN "durationType" TO "duration_type";--> statement-breakpoint
ALTER TABLE "workoutExerciseSets" RENAME COLUMN "weightUnit" TO "weight_unit";--> statement-breakpoint
ALTER TABLE "workouts" RENAME COLUMN "workoutStatus" TO "workout_status";--> statement-breakpoint
ALTER TABLE "templateSchedules" DROP CONSTRAINT "templateSchedules_templateWorkout_id_templateWorkouts_id_fk";
--> statement-breakpoint
ALTER TABLE "templateSchedules" DROP CONSTRAINT "templateSchedules_templateCardio_id_templateCardio_id_fk";
--> statement-breakpoint
ALTER TABLE "templateWorkoutCardio" DROP CONSTRAINT "templateWorkoutCardio_templateWorkout_id_templateWorkouts_id_fk";
--> statement-breakpoint
ALTER TABLE "templateWorkoutExercises" DROP CONSTRAINT "templateWorkoutExercises_templateWorkout_id_templateWorkouts_id_fk";
--> statement-breakpoint
ALTER TABLE "routines" ALTER COLUMN "routine_status" SET DATA TYPE routine_status;--> statement-breakpoint
ALTER TABLE "routines" ALTER COLUMN "duration_type" SET DATA TYPE duration_type;--> statement-breakpoint
ALTER TABLE "templateCardio" ALTER COLUMN "template_cardio_status" SET DATA TYPE template_cardio_status;--> statement-breakpoint
ALTER TABLE "templateCardio" ALTER COLUMN "duration_type" SET DATA TYPE duration_type;--> statement-breakpoint
ALTER TABLE "templateWorkouts" ALTER COLUMN "template_workout_status" SET DATA TYPE template_workout_status;--> statement-breakpoint
ALTER TABLE "templateWorkouts" ALTER COLUMN "duration_type" SET DATA TYPE duration_type;--> statement-breakpoint
ALTER TABLE "workoutExerciseSets" ALTER COLUMN "weight_unit" SET DATA TYPE weight_unit;--> statement-breakpoint
ALTER TABLE "workouts" ALTER COLUMN "workout_status" SET DATA TYPE workout_status;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateSchedules" ADD CONSTRAINT "templateSchedules_template_workout_id_templateWorkouts_id_fk" FOREIGN KEY ("template_workout_id") REFERENCES "templateWorkouts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateSchedules" ADD CONSTRAINT "templateSchedules_template_cardio_id_templateCardio_id_fk" FOREIGN KEY ("template_cardio_id") REFERENCES "templateCardio"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateWorkoutCardio" ADD CONSTRAINT "templateWorkoutCardio_template_workout_id_templateWorkouts_id_fk" FOREIGN KEY ("template_workout_id") REFERENCES "templateWorkouts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateWorkoutExercises" ADD CONSTRAINT "templateWorkoutExercises_template_workout_id_templateWorkouts_id_fk" FOREIGN KEY ("template_workout_id") REFERENCES "templateWorkouts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
