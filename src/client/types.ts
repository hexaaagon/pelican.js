export interface PelicanClientType {
  apiKey: string;
  apiUrl: string;

  /**
   * @name getAccountDetails
   * @description Retrieve account details
   * @example
   * const { PelicanClient } = require('pelican.js')
   * const pelicanClient = new PelicanClient({
   *   apiKey: 'plcn_YOUR_CLIENT_APIKEY',
   *   url: 'https://panel.example.com/'
   * });
   *
   * (async () => {
   *   const accountDetails = await pelicanClient.getAccountDetails();
   *   console.log(accountDetails);
   * })();
   */
  getAccountDetails(): Promise<AccountBased>;
}

export interface PelicanClientOptions {
  apiKey: string;
  url: string;
}

export interface AccountBased {
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
