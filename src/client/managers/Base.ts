import PelicanClient from "../Client";

export default class BaseManagers {
  public readonly client: PelicanClient;

  public constructor(client: PelicanClient) {
    this.client = client;
  }
}
