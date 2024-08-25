import { Collection } from "@discordjs/collection";
import { PelicanApplication } from "../..";
import { ApplicationMethods } from "../methods";
import User from "../util/formatter/User";
import { UserBased, UserCache, UserJSON } from "../types";
import BaseManagers from "./Base";
import { getRouter } from "../../util/Router";

export default class UserManagers extends BaseManagers implements UserCache {
  /**
   * @name cache
   * @description Users list (cached, updated every 5 minutes)
   */
  public cache = new Collection<string, User>();

  constructor(client: PelicanApplication) {
    super(client);

    this._init();
    setInterval(() => this._init(), 1000 * 60 * 5);
  }

  private async _init() {
    const users = (await this.client.router
      .GET(getRouter(ApplicationMethods.USERS))
      .then((res) =>
        res.data.data.map((user: any) => user.attributes)
      )) as UserJSON[];

    this.cache = new Collection(
      users?.map((user: UserJSON) => [
        user.username,
        new User(this.client, user),
      ])
    );

    return this;
  }

  async fetch(username: string) {
    if (!username) throw new Error("Username is required");

    const users = (await this.client.router
      .GET(getRouter(ApplicationMethods.USERS))
      .then((res) =>
        res.data.data.map((user: any) => user.attributes)
      )) as UserJSON[];

    this.cache = new Collection(
      users?.map((user: UserJSON) => [
        user.username,
        new User(this.client, user),
      ])
    );

    return this.cache.find((user) => user.username === username);
  }

  async fetchByEmail(email: string): Promise<UserBased | undefined> {
    if (!email) throw new Error("email is required");

    const users = (await this.client.router
      .GET(getRouter(ApplicationMethods.USERS))
      .then((res) =>
        res.data.data.map((user: any) => user.attributes)
      )) as UserJSON[];

    this.cache = new Collection(
      users?.map((user: UserJSON) => [
        user.username,
        new User(this.client, user),
      ])
    );

    return this.cache.find((user) => user.email === email);
  }

  async fetchByID(id: number): Promise<UserBased | undefined> {
    if (!id) throw new Error("User ID is required");

    const users = (await this.client.router
      .GET(getRouter(ApplicationMethods.USERS))
      .then((res) =>
        res.data.data.map((user: any) => user.attributes)
      )) as UserJSON[];

    this.cache = new Collection(
      users?.map((user: UserJSON) => [
        user.username,
        new User(this.client, user),
      ])
    );

    return this.cache.find((user) => user.id === id);
  }
}
