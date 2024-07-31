import { PelicanClient } from "../../index";
import { ClientMethods } from "../methods";
import { AccountBased, AccountJSON } from "../types";
import Base from "./Base";

export default class Account extends Base implements AccountBased {
  public uuid: string;
  public username: string;
  public email: string;
  public first_name: string;
  public last_name: string;
  public language: string;
  public image: string;
  public admin: boolean;
  public root_admin: boolean;
  public "2fa_enabled": boolean;
  public created_at: string;
  public updated_at: string;

  constructor(client: PelicanClient, data: { attributes: AccountJSON }) {
    super(client);

    this["2fa_enabled"] = data.attributes["2fa_enabled"];
    this.uuid = data.attributes.uuid;
    this.username = data.attributes.username;
    this.email = data.attributes.email;
    this.first_name = data.attributes.first_name;
    this.last_name = data.attributes.last_name;
    this.language = data.attributes.language;
    this.image = data.attributes.image;
    this.admin = data.attributes.admin;
    this.root_admin = data.attributes.root_admin;
    this.created_at = data.attributes.created_at;
    this.updated_at = data.attributes.updated_at;
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
