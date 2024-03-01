export type NewTemplateCardio = {
  user_id: string;
  routine_id: number;
  cardio_exercise_id: number;
  notes: string;
  template_cardio_status: "active" | "inactive";
  frequency: "daily" | "weekly" | "biweekly" | "monthly";
  duration_type: "days" | "weeks" | "months";
  duration_value: number;
};

export type TemplateCardio = NewTemplateCardio & {
  id: number;
  created_at: Date;
};
