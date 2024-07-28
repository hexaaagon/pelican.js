export default interface PelicanClientType {
  apiKey: string;
  apiUrl: string;

  init(): void;
}

export interface PelicanClientOptions {
  apiKey: string;
  url: string;
}
