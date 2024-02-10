export type WorkoutExercise = {
  id: number;
  workout_id: number;
  exercise_id: number;
  order_index: number;
};

export type NewWorkoutExercise = {
  workout_id: number;
  exercise_id: number;
  order_index: number;
};
