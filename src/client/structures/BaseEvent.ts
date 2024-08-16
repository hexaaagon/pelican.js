import EventEmitter from "events";
import PelicanClient from "../Client";
import { flatten } from "../../util/Util";

export class BaseEvent extends EventEmitter {
  public readonly client!: PelicanClient;

  public constructor(client: PelicanClient) {
    super();
    Object.defineProperty(this, "client", { value: client });
  }

  protected _clone() {
    return Object.assign(Object.create(this), this);
  }

  protected _patch(data: any) {
    return data;
  }

  protected _update(data = {}) {
    const clone = this._clone();
    this._patch(data);
    return clone;
  }

  toJSON(...props: Array<Record<string, boolean | string>>) {
    return flatten(this, ...props);
  }
}
