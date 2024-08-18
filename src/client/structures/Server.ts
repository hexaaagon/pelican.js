import PelicanClient from "../Client";
import { ClientMethods } from "../methods";
import { ServerBased, ServerJSON } from "../types";
import BaseEvent from "./BaseEvent";
export default class Server extends BaseEvent implements ServerBased {
  public readonly server_owner!: boolean;
  public readonly identifier!: string;
  public readonly internal_id!: number;
  public readonly name!: string;
  public readonly node!: string;
  public readonly is_node_under_maintenance!: boolean;
  public readonly sftp_details!: {
    ip: string;
    port: number;
    alias: string | null;
  };
  public readonly description!: string;
  public readonly limits!: {
    memory: number;
    swap: number;
    disk: number;
    io: number;
    cpu: number;
    threads: any | null;
    oom_disabled: boolean;
    oom_killer: boolean;
  };
  public readonly invocation!: string;
  public readonly docker_image!: string;
  public readonly egg_features!: any[];
  public readonly feature_limits!: {
    databases: number;
    allocations: number;
    backups: number;
  };
  public readonly status!: string | null;
  public readonly is_suspended!: boolean;
  public readonly is_installing!: boolean;
  public readonly is_transferring!: boolean;
  public readonly relationships!: {
    allocations: Array<any>;
    variables: Array<any>;
  };

  constructor(client: PelicanClient, data: ServerJSON) {
    super(client);

    this._patch(data);
  }

  protected _patch(data: ServerJSON) {
    data.relationships.allocations = (
      data.relationships.allocations as any
    ).data.map((d: any) => d.attributes);
    data.relationships.variables = (
      data.relationships.variables as any
    ).data.map((d: any) => d.attributes);

    this.initWebsocket();

    Object.assign(this, data);
  }

  private async initWebsocket() {
    const websocket = await this.client.router.GET(
      ClientMethods.SERVER_WEBSOCKET
    );
  }
}
