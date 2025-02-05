export type TUser = {
  name: string;
  phone: string;
  email: string;
  language: string;
  account_role: string;
  is_active: boolean;
  country: {
    id: number;
    code: string;
    name_en: string;
    name_ar: string;
  };
  measurement: {
    id: string;
    name_ar: string;
    name_en: string;
  };
};
