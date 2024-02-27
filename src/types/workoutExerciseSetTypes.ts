export type WorkoutExerciseSet = {
  id: number;
  workout_exercise_id: number;
  set_number: number;
  repetitions: number;
  weight: number;
  weight_unit: string;
  notes: string;
  created_at: string;
};

export type NewWorkoutExerciseSet = {
  workout_exercise_id: number;
  set_number: number;
  repetitions: number;
  weight: number;
  weight_unit: string;
  notes: string;
};
