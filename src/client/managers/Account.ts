import PelicanClient from "../Client";
import BaseManagers from "./Base";
import { ClientMethods } from "../methods";
import { AccountBased } from "../types";

export default class AccountManager
  extends BaseManagers
  implements AccountBased
{
  public readonly uuid!: string;
  public readonly username!: string;
  public readonly email!: string;
  public readonly first_name!: string;
  public readonly last_name!: string;
  public readonly language!: string;
  public readonly image!: string;
  public readonly admin!: boolean;
  public readonly root_admin!: boolean;
  public readonly "2fa_enabled"!: boolean;
  public readonly created_at!: string;
  public readonly updated_at!: string;

  constructor(client: PelicanClient) {
    super(client);

    this._init();
    setInterval(() => this._init(), 1000 * 60 * 5);
  }

  private async _init() {
    const accountData = await this.client.router
      .GET(ClientMethods.ACCOUNT)
      .then((res) => res.data.attributes);

    Object.assign(this, accountData);

    return this;
  }

  /**
   * @title Fetch
   * @description Fetch account details
   */
  public async fetch(): Promise<AccountBased> {
    return await this._init();
  }

  public async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<this> {
    if (!currentPassword) throw new Error("Current password is required");
    if (!newPassword) throw new Error("New password is required");
    if (newPassword.length < 8)
      throw new Error("Password must be at least 8 characters long");

    await this.client.router.PUT(ClientMethods.ACCOUNT_CHANGE_PASSWORD, {
      current_password: currentPassword,
      password: newPassword,
      password_confirmation: newPassword,
    });
    return this;
  }

  public async changeEmail(
    currentPassword: string,
    email: string
  ): Promise<this> {
    if (!currentPassword) throw new Error("Current password is required");
    if (!email) throw new Error("Email is required");
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
      throw new Error("Invalid email format");

    await this.client.router.PUT(ClientMethods.ACCOUNT_CHANGE_EMAIL, {
      current_password: currentPassword,
      email: email,
    });
    return this;
  }
}
