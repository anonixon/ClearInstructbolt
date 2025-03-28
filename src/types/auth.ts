import { User } from './index';

export interface IAuthCredentials {
  email: string;
  password: string;
}

export interface IAuthResponse {
  token: string;
  user: User;
  expiresIn: number;
}

export interface IAuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
} 