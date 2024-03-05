export type NewTemplateWorkoutCardio = {
  template_workout_id: number;
  cardio_exercise_id: number;
  duration: number;
  distance: number;
  order_index: number;
};

export type TemplateWorkoutCardio = NewTemplateWorkoutCardio & {
  id: number;
};
