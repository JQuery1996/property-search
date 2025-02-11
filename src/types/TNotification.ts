export type TNotification = {
  id: number;
  user_id: number;
  content: string;
  content_ar: string;
  data_id: number | null;
  type: number;
  icon: string | null;
  date: Date;
  image: string | null;
  url: string;
  is_read: number;
  publish: number;
  send_to: number;
  created_at: Date;
  updated_at: Date;
};
