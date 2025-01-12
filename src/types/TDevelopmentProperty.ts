export type TDevelopmentProperty = {
  name: string;
  phone: string;
  email: string;
  language: string;
  account_role: string;
  is_active: boolean;
  developer: {
    id: number;
    user_id: number;
    image: string;
    description: string;
    is_verified: boolean;
    created_at: Date;
    updated_at: Date;
  };
};
