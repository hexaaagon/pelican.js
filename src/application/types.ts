import { Language, Timezone } from "../types";
import { CacheMap } from "../util/Util";
import UserBuilder from "./structures/UserBuilder";

export interface PelicanApplicationType {
  apiKey: string;
  apiUrl: string;

  users: UserCache;
}

export interface PelicanApplicationOptions {
  apiKey: string;
  url: string;
}

export interface UserBased extends UserJSON {}

export interface UserJSON {
  id: number;
  external_id: string | null;
  uuid: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  language: "en" | string;
  image: string;
  admin: boolean;
  root_admin: boolean;
  "2fa_enabled": boolean;
  "2fa": boolean;
  created_at: string;
  updated_at: string;
}

export interface UserCache extends CacheMap<UserBased> {
  /**
   * @name Fetch
   * @description Fetch user based on their username
   * @param username Username
   */
  create(user: UserBuilder | UserCreate): Promise<UserBased>;

  fetch(username: string): Promise<UserBased | undefined>;
  fetchByEmail(email: string): Promise<UserBased | undefined>;
  fetchByID(id: number): Promise<UserBased | undefined>;
}

export interface UserCreate {
  email: string;
  external_id?: string | null;
  username: string;
  password?: string | null;
  root_admin?: boolean;
  language?: Language;
  timezone?: Timezone;
  first_name: string;
  last_name: string;
}
