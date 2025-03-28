import { API_ENDPOINTS } from '../config/constants';
import { IAuthCredentials, IAuthResponse } from '../types/auth';
import { User } from '../types';

class AuthService {
  private static instance: AuthService;
  private token: string | null = localStorage.getItem('token');
  private user: User | null = JSON.parse(localStorage.getItem('user') || 'null');

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(credentials: IAuthCredentials): Promise<IAuthResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data: IAuthResponse = await response.json();
      this.setSession(data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async register(userData: Partial<User>): Promise<IAuthResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data: IAuthResponse = await response.json();
      this.setSession(data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async requestPasswordReset(email: string): Promise<void> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to request password reset');
      }
    } catch (error) {
      throw error;
    }
  }

  public async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, newPassword }),
      });

      if (!response.ok) {
        throw new Error('Failed to reset password');
      }
    } catch (error) {
      throw error;
    }
  }

  public async verifyEmail(token: string): Promise<void> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.VERIFY_EMAIL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error('Failed to verify email');
      }
    } catch (error) {
      throw error;
    }
  }

  public async resendVerificationEmail(email: string): Promise<void> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.RESEND_VERIFICATION, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to resend verification email');
      }
    } catch (error) {
      throw error;
    }
  }

  public async loginWithGoogle(): Promise<IAuthResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.GOOGLE_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Google login failed');
      }

      const data: IAuthResponse = await response.json();
      this.setSession(data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public async loginWithMicrosoft(): Promise<IAuthResponse> {
    try {
      const response = await fetch(API_ENDPOINTS.AUTH.MICROSOFT_LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Microsoft login failed');
      }

      const data: IAuthResponse = await response.json();
      this.setSession(data);
      return data;
    } catch (error) {
      throw error;
    }
  }

  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.token = null;
    this.user = null;
  }

  private setSession(data: IAuthResponse): void {
    this.token = data.token;
    this.user = data.user;
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public getCurrentUser(): User | null {
    return this.user;
  }

  public getToken(): string | null {
    return this.token;
  }
}

export const authService = AuthService.getInstance();
