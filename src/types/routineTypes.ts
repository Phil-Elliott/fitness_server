export type Routine = {
  id: number;
  user_id: number;
  name: string;
  notes: string;
  frequency: string;
  start_date: Date;
  end_date: Date;
  created_at: string;
};

export type NewRoutine = {
  name: string;
  notes: string;
  frequency: string;
  start_date: Date;
  end_date: Date;
};
