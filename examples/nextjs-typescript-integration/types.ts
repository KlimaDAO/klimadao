export type Pool = "bct" | "nct" | "ubo" | "nbo";

/**
 * Success response from https://ident.provide.services/api/v1/authenticate
 */
export interface ProvideAuthResponse {
  user: {
    id: string;
    created_at: string;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    permissions: number;
    privacy_policy_agreed_at: string;
    terms_of_service_agreed_at: string;
  };
  token: {
    id: string;
    access_token: string;
    expires_in: number;
    permissions: number;
  };
}
