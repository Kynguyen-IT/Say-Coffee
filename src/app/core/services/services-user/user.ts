export interface Roles {
  subscriber?: boolean;
  editor?: boolean;
  admin?: boolean;
}

export interface User {
  displayName?: string;
  email: string;
  uid: string;
  photoURL?: string;
  roles: Roles;
}
