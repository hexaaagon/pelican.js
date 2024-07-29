import BaseRouters from "../base/routers";
import { ClientMethods } from "./methods";
import type PelicanClientType from "./types";
import type { PelicanClientOptions } from "./types";

export default class PelicanClient implements PelicanClientType {
  apiKey: string;
  apiUrl: string;
  router: BaseRouters;

  /**
   * @name PelicanClient
   * @description Initialize Pelican Client
   * @example
   * const { PelicanClient } = require('pelican.js')
   * const pelicanClient = new PelicanClient({
   *   apiKey: 'plcn_YOUR_CLIENT_APIKEY',
   *   url: 'https://panel.example.com/'
   * });
   *
   * @returns {PelicanClientType}
   */
  constructor(options: PelicanClientOptions) {
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
  async getAccountDetails() {
    return (await this.router.GET(ClientMethods.ACCOUNT)).data;
  }
}
