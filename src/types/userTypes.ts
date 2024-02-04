export type User = {
  id: string;
  clerk_user_id: string;
  email: string;
  display_name: string;
};

export type NewUser = {
  clerk_user_id: string;
  email: string;
  display_name: string;
};
