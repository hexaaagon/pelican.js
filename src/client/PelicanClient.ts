import type PelicanClientType from "../types/base/PelicanClient";
import type { PelicanClientOptions } from "../types/base/PelicanClient";

export default class PelicanClient implements PelicanClientType {
  apiKey: string;
  apiUrl: string;

  constructor(options: PelicanClientOptions) {
    this.apiKey = options.apiKey;
    this.apiUrl = options.url;
  }

  init(): void {
    console.log("This package is still in development.");
  }
}
