export type Workout = {
  id: number;
  user_id: string;
  routine_id: number;
  name: string;
  notes: string;
  date: string;
  workout_status: string;
  created_at: string;
};

export type NewWorkout = {
  user_id: string;
  routine_id: number;
  name: string;
  notes: string;
  date: string;
  workout_status: string;
};
