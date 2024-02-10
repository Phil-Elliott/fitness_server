export type Workout = {
  id: number;
  routine_id: number;
  name: string;
  description: string;
  created_at: string;
};

export type NewWorkout = {
  routine_id: number;
  name: string;
  description: string;
};
