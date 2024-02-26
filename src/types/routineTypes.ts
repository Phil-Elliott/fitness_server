export type Routine = {
  id: number;
  user_id: number;
  name: string;
  notes: string;
  frequency: string;
  startDate: Date;
  endDate: Date;
  created_at: string;
};

export type NewRoutine = {
  name: string;
  notes: string;
  frequency: string;
  startDate: Date;
  endDate: Date;
};
