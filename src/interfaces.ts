export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  user_id: number; // <-- السطر الجديد
  created_at: string;
}