export default interface Server {
  object: "server";
  attributes: {
    id: number;
    external_id: string | null;
    uuid: string;
    identifier: string;
    name: string;
    description: string;
    status: string | null;
    suspended: boolean;
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
    feature_limits: {
      databases: number;
      allocations: number;
      backups: number;
    };
    user: number;
    node: number;
    allocation: number;
    egg: number;
    container: Container;
    updated_at: Date;
    created_at: Date;
  };
}

export interface Container {
  startup_command: string;
  image: string;
  installed: number;
  environment: {
    COMMAND: string;
    STARTUP: string;
    P_SERVER_UUID: string;
    P_SERVER_ALLOCATION_LIMIT: number;
  };
}
