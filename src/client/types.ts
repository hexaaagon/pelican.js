import AccountManager from "./managers/Account";

export interface PelicanClientType {
  apiKey: string;
  apiUrl: string;

  account: AccountBased;
}

export interface PelicanClientOptions {
  apiKey: string;
  url: string;
}

export interface AccountBased extends AccountJSON {
  changeEmail(currentPassword: string, email: string): Promise<this>;
  /**
   * @description Change account password
   */
  changePassword(currentPassword: string, newPassword: string): Promise<this>;
}

export interface AccountJSON {
  uuid: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  language: "en" | string;
  image: string;
  admin: boolean;
  root_admin: boolean;
  "2fa_enabled": boolean;
  created_at: string;
  updated_at: string;
}
