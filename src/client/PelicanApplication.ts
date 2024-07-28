import type PelicanApplicationType from "../types/base/PelicanApplication";
import type { PelicanApplicationOptions } from "../types/base/PelicanApplication";

export default class BaseClient implements PelicanApplicationType {
  apiKey: string;
  apiUrl: string;

  constructor(options: PelicanApplicationOptions) {
    this.apiKey = options.apiKey;
    this.apiUrl = options.url;
  }

  init(): void {
    console.log("This package is still in development.");
  }
}
