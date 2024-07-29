import BaseRouters from "../base/routers";
import { ApplicationMethods } from "./methods";
import type PelicanApplicationType from "./types";
import type { PelicanApplicationOptions } from "./types";

export default class BaseClient implements PelicanApplicationType {
  apiKey: string;
  apiUrl: string;
  router: BaseRouters;

  /**
   * @name PelicanApplication
   * @description Initialize Pelican Application
   * @example
   * const { PelicanApplication } = require('pelican.js')
   * const pelicanApplication = new PelicanApplication({
   *   apiKey: 'peli_YOUR_CLIENT_APIKEY',
   *   url: 'https://panel.example.com/'
   * });
   *
   * @returns {PelicanApplicationType}
   */
  constructor(options: PelicanApplicationOptions) {
    if (!options.apiKey) throw new Error("API Key is required");
    this.apiKey = options.apiKey;

    if (!options.url) throw new Error("API URL is required");
    this.apiUrl = options.url.endsWith("/")
      ? options.url.slice(0, -1)
      : options.url;

    this.router = new BaseRouters(this.apiKey, this.apiUrl);

    return this;
  }

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
  async getAllUsers() {
    return (await this.router.GET(ApplicationMethods.USERS)).data;
  }
}
