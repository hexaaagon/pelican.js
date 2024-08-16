import { CacheMap } from "../util/Util";
import AccountManager from "./managers/Account";

export interface PelicanClientType {
  apiKey: string;
  apiUrl: string;

  account: AccountBased;
  servers: ServerCache;
}

export interface PelicanClientOptions {
  apiKey: string;
  url: string;
}

export interface AccountBased extends AccountJSON {
  changeEmail(currentPassword: string, email: string): Promise<this>;
  /**
   * @description Change account password
   */
  changePassword(currentPassword: string, newPassword: string): Promise<this>;
}

export interface AccountJSON {
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
  created_at: string;
  updated_at: string;
}

export interface ServerCache extends CacheMap<ServerBased> {}

export interface ServerBased extends ServerJSON {}

export interface ServerJSON {
  server_owner: boolean;
  identifier: string;
  internal_id: number;
  name: string;
  node: string;
  is_node_under_maintenance: boolean;
  sftp_details: {
    ip: string;
    port: number;
    alias: string | null;
  };
  description: string;
  limits: {
    memory: number;
    swap: number;
    disk: number;
    io: number;
    cpu: number;
    threads: any | null; // ambigous, still don't know what is the correct types
    oom_disabled: boolean;
    oom_killer: boolean;
  };
  invocation: string;
  docker_image: string;
  egg_features: any[]; // ambigous, still don't k now what is the correct types
  feature_limits: {
    databases: number;
    allocations: number;
    backups: number;
  };
  status: "suspended" | string | null; // ambigous, maybe theres more string than this.
  is_suspended: boolean;
  is_installing: boolean;
  is_transferring: boolean;
  relationships: {
    allocations: Array<{
      id: number;
      ip: string;
      ip_alias: string | null;
      port: number;
      notes: string | null;
      is_default: boolean;
    }>;
    variables: Array<{
      name: string;
      description: string | null;
      env_variable: string;
      default_value: string | null;
      server_value: string | null;
      is_editable: boolean;
      rules: string | null;
    }>;
  };
}
