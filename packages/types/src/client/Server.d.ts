import { List } from "../utils";

export interface Server {
  object: "server";
  attributes: {
    server_owner: boolean;
    identifier: string;
    internal_id: number;
    uuid: string;
    name: string;
    node: string;
    is_node_under_maintenance: boolean;
    sftp_details: SFTPDetails;
    description: string;
    limits: {
      memory: number;
      swap: number;
      disk: number;
      io: number;
      cpu: number;
      // FIXME: type not sure
      threads: any | null;
      oom_disabled: boolean;
      oom_killer: boolean;
    };
    invocation: string;
    docker_image: string;
    // FIXME: type not sure
    egg_features: any[];
    feature_limits: {
      databases: number;
      allocations: number;
      backups: number;
    };
    status: string | null;
    is_suspended: boolean;
    is_installing: boolean;
    is_transferring: boolean;
    relationships: {
      allocations: Allocations;
      variables: Variables;
    };
  };
}

export interface SFTPDetails {
  ip: string;
  alias: null;
  port: number;
}

export type Allocations = List<
  {
    object: "allocation";
    attributes: {
      id: number;
      ip: string;
      ip_alias: string | null;
      port: number;
      notes: string | null;
      is_default: boolean;
    };
  }[]
>;

export type Variables = List<
  {
    object: "egg_variable";
    attributes: {
      name: string;
      description: string;
      env_variable: string;
      default_value: string;
      server_value: string;
      is_editable: boolean;
      rules: string;
    };
  }[]
>;
