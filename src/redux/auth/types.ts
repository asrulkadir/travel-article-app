export interface IUser {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: null;
}

export interface IAuthData {
  jwt: string;
  user: IUser;
}

export interface IAuthState {
  authData: IAuthData;
  loading: boolean;
  error: string | null;
}

export interface ILoginPayload {
  identifier: string;
  password: string;
}

export interface IRegisterPayload {
  username: string;
  email: string;
  password: string;
}