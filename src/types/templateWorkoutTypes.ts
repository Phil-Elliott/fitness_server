export type NewTemplateWorkout = {
  user_id: string;
  routine_id: number;
  name: string;
  notes: string;
  rest_between_exercises: number;
  template_workout_status: "active" | "inactive";
  frequency: "daily" | "weekly" | "biweekly" | "monthly";
  duration_type: "days" | "weeks" | "months";
  duration: number;
};

export type TemplateWorkout = NewTemplateWorkout & {
  id: number;
  created_at: Date;
};
