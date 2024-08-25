import { PelicanApplication } from "../../../";
import { UserBased, UserJSON } from "../../types";
import Base from "./Base";

export default class User extends Base implements UserBased {
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
  public readonly id!: number;
  public readonly external_id!: string | null;

  constructor(client: PelicanApplication, data: UserJSON) {
    super(client);

    this._patch(data);
  }
  "2fa": boolean;

  protected _patch(data: UserJSON) {
    Object.assign(this, data);
  }
}
