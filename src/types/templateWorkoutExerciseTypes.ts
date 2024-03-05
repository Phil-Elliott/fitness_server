export type NewTemplateWorkoutExercise = {
  template_workout_id: number;
  exercise_id: number;
  order_index: number;
  sets: number;
  rest_between_sets: number;
};

export type TemplateWorkoutExercise = NewTemplateWorkoutExercise & {
  id: number;
};
