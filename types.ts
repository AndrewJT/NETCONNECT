export const CONFIG_SCHEMA_VERSION = 1;

export type ThemeMode = 'light' | 'dark';

export enum ConnectionType {
  RDP = 'RDP',
  VPN = 'VPN'
}

export enum VPNProtocol {
  OpenVPN = 'OpenVPN',
  FortiClient = 'FortiClient',
  GlobalProtect = 'GlobalProtect',
  AnyConnect = 'AnyConnect',
  Citrix = 'Citrix',
  Parallels = 'Parallels'
}

export interface CredentialProfile {
  id: string;
  name: string;
  username: string;
  password?: string;
  domain?: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface ConnectionFolder {
  id: string;
  name: string;
  description?: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface ConnectionNote {
  id: string;
  connectionId?: string;
  folderId?: string;
  body: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface Connection {
  id: string;
  name: string;
  type: ConnectionType;
  host: string;
  port: string;
  /**
   * Legacy text grouping field kept for ~/.netconnect_pro.json compatibility.
   * Newer UI work should prefer folderId and keep group as a readable mirror.
   */
  group?: string;
  /**
   * Stable folder reference introduced for future folder management.
   */
  folderId?: string;
  username?: string;
  password?: string;
  sso?: boolean;
  lastConnected?: number;
  protocol?: VPNProtocol;
  domain?: string;
  icon?: string;
  /**
   * UI-facing identity link used by the inline app.
   */
  identityId?: string;
  /**
   * Legacy/external alias for identityId, preserved for existing configs.
   */
  credentialId?: string;
  gateway?: string;
  /**
   * Optional per-connection notes. The top-level AppConfig.notes array remains
   * the canonical notes store for import/export and future notes UI.
   */
  notes?: ConnectionNote[];
  note?: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface AppConfig {
  version: typeof CONFIG_SCHEMA_VERSION;
  theme: ThemeMode;
  /**
   * Existing connection profiles are preserved. normalizeConfig fills missing
   * folderId/notes fields without dropping legacy connection fields.
   */
  connections: Connection[];
  /**
   * Existing identity vault entries are preserved.
   */
  identities: CredentialProfile[];
  /**
   * Explicit folder store. Empty for legacy configs until folders are managed.
   */
  folders: ConnectionFolder[];
  /**
   * Canonical notes store. Connection.notes/note values are normalized into this
   * array while remaining present on the owning connection for compatibility.
   */
  notes: ConnectionNote[];
  pythonSync: boolean;
  showDevTools: boolean;
}
