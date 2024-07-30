import { PelicanClient } from "../../index";
import { AccountBased, AccountJSON } from "../types";
import Base from "./Base";

export default class Account extends Base implements AccountBased {
  constructor(client: PelicanClient, data: AccountJSON) {
    super(client);

    // this._patch(data);
  }

  // private _patch(data: AccountJSON): void {
  //   // implementation here
  // }
}
