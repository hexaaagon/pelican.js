import BaseRouters from "../base/routers";
import { CacheMap } from "../util/Util";
import AccountManager from "./managers/Account";
import ServersManager from "./managers/Servers";
import { ClientMethods } from "./methods";
import type {
  PelicanClientType,
  PelicanClientOptions,
  AccountBased,
  ServerBased,
} from "./types";

export default class PelicanClient implements PelicanClientType {
  apiKey: string;
  apiUrl: string;
  router: BaseRouters;
  account: AccountBased;
  servers: CacheMap<ServerBased>;

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
  public constructor(options: PelicanClientOptions) {
    if (!options.apiKey) throw new Error("API Key is required");
    this.apiKey = options.apiKey;

    if (!options.url) throw new Error("API URL is required");
    this.apiUrl = options.url.endsWith("/")
      ? options.url.slice(0, -1)
      : options.url;

    this.router = new BaseRouters(this.apiKey, this.apiUrl);

    this.account = new AccountManager(this);

    this.servers = new ServersManager(this);
  }
}
