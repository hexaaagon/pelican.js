import { Language, Timezone } from "../../types";
import { UserCreate, UserJSON } from "../types";
import Base from "./Base";

export default class UserBuilder extends Base implements UserCreate {
  public readonly email!: string;
  public readonly external_id?: string | null;
  public readonly username!: string;
  public readonly password?: string | null;
  public readonly root_admin?: boolean;
  public readonly language?: Language;
  public readonly timezone?: Timezone;
  public readonly first_name: string = "";
  public readonly last_name: string = "";
  public readonly toJSON!: () => UserCreate;

  constructor(user?: UserCreate) {
    super();
    if (user) Object.assign(this, user);
  }

  public setEmail(email: string) {
    Object.assign(this, { email });
    return this;
  }

  public setExternalId(external_id: string | null) {
    Object.assign(this, { external_id });
    return this;
  }

  public setUsername(username: string) {
    Object.assign(this, { username });
    return this;
  }

  public setPassword(password: string | null) {
    Object.assign(this, { password });
    return this;
  }

  public setAdmin(root_admin: boolean) {
    Object.assign(this, { root_admin });
    return this;
  }
  public setLanguage(language: Language) {
    Object.assign(this, { language });
    return this;
  }

  public setTimezone(timezone: Timezone) {
    Object.assign(this, { timezone });
    return this;
  }

  public setFirstName(first_name: string) {
    Object.assign(this, { first_name });
    return this;
  }

  public setLastName(last_name: string) {
    Object.assign(this, { last_name });
    return this;
  }
}
