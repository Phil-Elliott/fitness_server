CREATE TABLE IF NOT EXISTS "templateWorkoutExercises" (
	"id" serial PRIMARY KEY NOT NULL,
	"templateWorkout_id" integer NOT NULL,
	"exercise_id" integer NOT NULL,
	"order_index" integer NOT NULL,
	"sets" integer NOT NULL,
	"restBetweenSets" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "templateWorkoutSchedules" (
	"id" serial PRIMARY KEY NOT NULL,
	"templateWorkout_id" integer NOT NULL,
	"dayOfWeek" "daysOfWeek" NOT NULL,
	"startTime" varchar(256),
	"endTime" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "templateWorkouts" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"routine_id" integer,
	"name" varchar(256) NOT NULL,
	"description" varchar(256),
	"restBetweenSets" integer,
	"status" "status",
	"frequency" "frequency",
	"durationType" "durationType",
	"duration" integer,
	"created_at" varchar(256) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "workouts" ALTER COLUMN "routine_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "routines" ADD COLUMN "status" "status";--> statement-breakpoint
ALTER TABLE "routines" ADD COLUMN "frequency" "frequency";--> statement-breakpoint
ALTER TABLE "routines" ADD COLUMN "durationType" "durationType";--> statement-breakpoint
ALTER TABLE "routines" ADD COLUMN "duration" integer;--> statement-breakpoint
ALTER TABLE "workouts" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "workouts" ADD COLUMN "date" varchar(256);--> statement-breakpoint
ALTER TABLE "workouts" ADD COLUMN "status" varchar(256) NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workouts" ADD CONSTRAINT "workouts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateWorkoutExercises" ADD CONSTRAINT "templateWorkoutExercises_templateWorkout_id_templateWorkouts_id_fk" FOREIGN KEY ("templateWorkout_id") REFERENCES "templateWorkouts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateWorkoutExercises" ADD CONSTRAINT "templateWorkoutExercises_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateWorkoutSchedules" ADD CONSTRAINT "templateWorkoutSchedules_templateWorkout_id_templateWorkouts_id_fk" FOREIGN KEY ("templateWorkout_id") REFERENCES "templateWorkouts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateWorkouts" ADD CONSTRAINT "templateWorkouts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateWorkouts" ADD CONSTRAINT "templateWorkouts_routine_id_routines_id_fk" FOREIGN KEY ("routine_id") REFERENCES "routines"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
