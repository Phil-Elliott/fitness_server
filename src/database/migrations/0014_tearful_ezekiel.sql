ALTER TABLE "cardio" ADD COLUMN "date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "cardio" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "routines" ADD COLUMN "start_date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "routines" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "templateCardio" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "templateSchedules" ADD COLUMN "start_time" time with time zone;--> statement-breakpoint
ALTER TABLE "templateWorkouts" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "workoutExerciseSets" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "workouts" ADD COLUMN "date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "workouts" ADD COLUMN "created_at" timestamp DEFAULT now();