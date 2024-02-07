export type Routine = {
  id: number;
  user_id: number;
  name: string;
  description: string;
  created_at: string;
};

export type NewRoutine = {
  user_id: number;
  name: string;
  description: string;
};
