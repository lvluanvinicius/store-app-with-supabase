export interface ConnectPlusValidateResponse {
  app_profile_exists: boolean;
  connect_plus_access: boolean;
  user: {
    id: number;
    name: string;
    email: string;
  };
  access: {
    id: number;
    id_contrato: number;
    id_vd_contrato: number;
    id_produto: number;
    descricao: string;
    product: {
      id: number;
      descricao: string;
    };
  }[];
}

export interface UserProfile {
  id: string;
  username: string;
  full_name: string;
  email: string;
  avatar_url: null | string;
  subscription_plan: string;
  storage_used_bytes: number;
  max_storage_bytes: number | null;
  images_generated_today: number;
  last_image_reset_at: string;
  created_at: string;
  updated_at: string;
}
