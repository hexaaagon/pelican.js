export default interface PelicanApplicationType {
  apiKey: string;
  apiUrl: string;

  init(): void;
}

export interface PelicanApplicationOptions {
  apiKey: string;
  url: string;
}
