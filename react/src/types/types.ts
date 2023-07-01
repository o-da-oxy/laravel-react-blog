export type User = {
  name: string;
  email: string;
};

export type Post = {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
  updated_at: string;
  user: User;
};
