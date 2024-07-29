export interface PelicanApplicationType {
  apiKey: string;
  apiUrl: string;

  // TODO: don't use 'any', change to correct type (manual typings)
  getAllUsers(): Promise<any>;
}

export interface PelicanApplicationOptions {
  apiKey: string;
  url: string;
}
