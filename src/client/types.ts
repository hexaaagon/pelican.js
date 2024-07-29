export default interface PelicanClientType {
  apiKey: string;
  apiUrl: string;

  // TODO: don't use 'any', change to correct type (manual typings)
  getAccountDetails(): Promise<any>;
}

export interface PelicanClientOptions {
  apiKey: string;
  url: string;
}
