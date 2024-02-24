ALTER TABLE "cardio" DROP CONSTRAINT "cardio_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "routines" DROP CONSTRAINT "routines_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "templateCardio" DROP CONSTRAINT "templateCardio_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "templateCardio" DROP CONSTRAINT "templateCardio_routine_id_routines_id_fk";
--> statement-breakpoint
ALTER TABLE "templateSchedules" DROP CONSTRAINT "templateSchedules_template_workout_id_templateWorkouts_id_fk";
--> statement-breakpoint
ALTER TABLE "templateWorkoutCardio" DROP CONSTRAINT "templateWorkoutCardio_template_workout_id_templateWorkouts_id_fk";
--> statement-breakpoint
ALTER TABLE "templateWorkoutExercises" DROP CONSTRAINT "templateWorkoutExercises_template_workout_id_templateWorkouts_id_fk";
--> statement-breakpoint
ALTER TABLE "templateWorkouts" DROP CONSTRAINT "templateWorkouts_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "templateWorkouts" DROP CONSTRAINT "templateWorkouts_routine_id_routines_id_fk";
--> statement-breakpoint
ALTER TABLE "workoutCardio" DROP CONSTRAINT "workoutCardio_cardio_id_cardio_id_fk";
--> statement-breakpoint
ALTER TABLE "workoutExercises" DROP CONSTRAINT "workoutExercises_workout_id_workouts_id_fk";
--> statement-breakpoint
ALTER TABLE "workoutExerciseSets" DROP CONSTRAINT "workoutExerciseSets_workout_exercise_id_workoutExercises_id_fk";
--> statement-breakpoint
ALTER TABLE "workouts" DROP CONSTRAINT "workouts_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "workouts" DROP CONSTRAINT "workouts_routine_id_routines_id_fk";
--> statement-breakpoint
ALTER TABLE "users" ADD PRIMARY KEY ("clerk_user_id");--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "clerk_user_id" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cardio" ADD CONSTRAINT "cardio_user_id_users_clerk_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("clerk_user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "routines" ADD CONSTRAINT "routines_user_id_users_clerk_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("clerk_user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateCardio" ADD CONSTRAINT "templateCardio_user_id_users_clerk_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("clerk_user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateCardio" ADD CONSTRAINT "templateCardio_routine_id_routines_id_fk" FOREIGN KEY ("routine_id") REFERENCES "routines"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateSchedules" ADD CONSTRAINT "templateSchedules_template_workout_id_templateWorkouts_id_fk" FOREIGN KEY ("template_workout_id") REFERENCES "templateWorkouts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateWorkoutCardio" ADD CONSTRAINT "templateWorkoutCardio_template_workout_id_templateWorkouts_id_fk" FOREIGN KEY ("template_workout_id") REFERENCES "templateWorkouts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateWorkoutExercises" ADD CONSTRAINT "templateWorkoutExercises_template_workout_id_templateWorkouts_id_fk" FOREIGN KEY ("template_workout_id") REFERENCES "templateWorkouts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateWorkouts" ADD CONSTRAINT "templateWorkouts_user_id_users_clerk_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("clerk_user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateWorkouts" ADD CONSTRAINT "templateWorkouts_routine_id_routines_id_fk" FOREIGN KEY ("routine_id") REFERENCES "routines"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workoutCardio" ADD CONSTRAINT "workoutCardio_cardio_id_cardio_id_fk" FOREIGN KEY ("cardio_id") REFERENCES "cardio"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workoutExercises" ADD CONSTRAINT "workoutExercises_workout_id_workouts_id_fk" FOREIGN KEY ("workout_id") REFERENCES "workouts"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workoutExerciseSets" ADD CONSTRAINT "workoutExerciseSets_workout_exercise_id_workoutExercises_id_fk" FOREIGN KEY ("workout_exercise_id") REFERENCES "workoutExercises"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workouts" ADD CONSTRAINT "workouts_user_id_users_clerk_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("clerk_user_id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workouts" ADD CONSTRAINT "workouts_routine_id_routines_id_fk" FOREIGN KEY ("routine_id") REFERENCES "routines"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "id";