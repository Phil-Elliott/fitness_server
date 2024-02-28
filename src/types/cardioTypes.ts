export type cardio = {
  id: string;
  user_id: string;
  routine_id?: string;
  cardio_exercise_id: string;
  duration: number;
  distance: number;
  date: string;
  notes?: string;
  created_at?: string;
};

export type NewCardio = {
  user_id: string;
  routine_id?: string;
  cardio_exercise_id: string;
  duration: number;
  distance: number;
  date: string;
  notes?: string;
};
