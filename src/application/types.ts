export interface PelicanApplicationType {
  apiKey: string;
  apiUrl: string;

  /**
   * @name getAllUsers
   * @description Retrieve all users
   * @example
   * const { PelicanApplication } = require('pelican.js')
   * const pelicanApplication = new PelicanApplication({
   *   apiKey: 'peli_YOUR_CLIENT_APIKEY',
   *   url: 'https://panel.example.com/'
   * });
   *
   * (async () => {
   *   const allUsers = await pelicanApplication.getAllUsers();
   *   console.log(allUsers);
   * })();
   */
  getAllUsers(): Promise<any>;
}

export interface PelicanApplicationOptions {
  apiKey: string;
  url: string;
}
