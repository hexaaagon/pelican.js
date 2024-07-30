export function getRouter(
  path: string,
  identifiers?: Array<{ name: string; value: string }>
) {
  let router = path;

  if (!identifiers) return router;

  for (const identifier of identifiers) {
    router = router.replace(`{{${identifier.name}}}`, identifier.value);
  }

  return router;
}

export enum ClientRouters {
  // Account
  ACCOUNT = "/api/client/account",
  ACCOUNT_ACTIVITY = "/api/client/account/activity",
  ACCOUNT_APIKEYS = "/api/client/account/api-keys",
  ACCOUNT_APIKEYS_IDENTIFIER = "/api/client/account/api-keys/{{identifier}}",
  ACCOUNT_CHANGE_EMAIL = "/api/client/account/email",
  ACCOUNT_CHANGE_PASSWORD = "/api/client/account/password",

  // Server
  SERVERS = "/api/client/",
  SERVER_ACTIVITY = "/api/client/servers/{{server}}/activity",
  SERVER_BACKUP = "/api/client/servers/{{server}}/backups/{{backup}}",
  SERVER_BACKUP_DOWNLOAD = "/api/client/servers/{{server}}/backups/{{backup}}/download",
  SERVER_BACKUP_LOCKTOGGLE = "/api/client/servers/{{server}}/backups/{{backup}}/lock",
  SERVER_BACKUP_RESTORE = "/api/client/servers/{{server}}/backups/{{backup}}/restore",
  SERVER_BACKUPS = "/api/client/servers/{{server}}/backups",
}
