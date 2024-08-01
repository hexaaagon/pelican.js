import { PelicanApplication } from "../..";

export default class BaseManagers {
  public readonly client: PelicanApplication;

  public constructor(client: PelicanApplication) {
    this.client = client;
  }
}
