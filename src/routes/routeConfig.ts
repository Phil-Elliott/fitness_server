import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import * as routes from "./";

export default function configureRoutes(app: any) {
  app.use("/api/v1/user", ClerkExpressRequireAuth(), routes.userRoutes);
  app.use("/api/v1/routine", ClerkExpressRequireAuth(), routes.routineRoutes);
  app.use(
    "/api/v1/templateWorkout",
    ClerkExpressRequireAuth(),
    routes.templateWorkoutRoutes
  );
  app.use(
    "/api/v1/templateSchedule",
    ClerkExpressRequireAuth(),
    routes.templateScheduleRoutes
  );
  app.use(
    "/api/v1/templateWorkoutExercise",
    ClerkExpressRequireAuth(),
    routes.templateWorkoutExerciseRoutes
  );
  app.use("/api/v1/workout", ClerkExpressRequireAuth(), routes.workoutRoutes);
  app.use("/api/v1/cardio", ClerkExpressRequireAuth(), routes.cardioRoutes);
  app.use(
    "/api/v1/templateCardio",
    ClerkExpressRequireAuth(),
    routes.templateCardioRoutes
  );
  app.use(
    "/api/v1/templateWorkoutCardio",
    ClerkExpressRequireAuth(),
    routes.templateWorkoutCardioRoutes
  );
  app.use(
    "/api/v1/workoutExercise",
    ClerkExpressRequireAuth(),
    routes.workoutExerciseRoutes
  );
  app.use(
    "/api/v1/workoutCardio",
    ClerkExpressRequireAuth(),
    routes.workoutCardioRoutes
  );
  app.use("/api/v1/exercise", ClerkExpressRequireAuth(), routes.exerciseRoutes);
  app.use(
    "/api/v1/cardioExercise",
    ClerkExpressRequireAuth(),
    routes.cardioExerciseRoutes
  );
  app.use(
    "/api/v1/workoutExerciseSet",
    ClerkExpressRequireAuth(),
    routes.workoutExerciseSetRoutes
  );
}
