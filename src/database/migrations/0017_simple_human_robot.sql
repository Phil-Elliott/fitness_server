ALTER TABLE "users" RENAME COLUMN "clerk_user_id" TO "id";--> statement-breakpoint
ALTER TABLE "cardio" DROP CONSTRAINT "cardio_user_id_users_clerk_user_id_fk";
--> statement-breakpoint
ALTER TABLE "routines" DROP CONSTRAINT "routines_user_id_users_clerk_user_id_fk";
--> statement-breakpoint
ALTER TABLE "templateCardio" DROP CONSTRAINT "templateCardio_user_id_users_clerk_user_id_fk";
--> statement-breakpoint
ALTER TABLE "templateWorkouts" DROP CONSTRAINT "templateWorkouts_user_id_users_clerk_user_id_fk";
--> statement-breakpoint
ALTER TABLE "workouts" DROP CONSTRAINT "workouts_user_id_users_clerk_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cardio" ADD CONSTRAINT "cardio_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "routines" ADD CONSTRAINT "routines_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateCardio" ADD CONSTRAINT "templateCardio_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "templateWorkouts" ADD CONSTRAINT "templateWorkouts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workouts" ADD CONSTRAINT "workouts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
