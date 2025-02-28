import { IUser } from '@/shared/types';

export interface IAuthPayload {
  email: string;
  password: string;
}

export interface IAuthResponse {
  user: IUser;
  token: string;
  refreshToken: string;
}

export interface IValidateAuthResponse extends IUser {}

export interface IUseGetValidateAuthProps {
  enabled: boolean;
}

/* register */
export interface IRegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface IRegisterResponse {
  user: IUser;
  token: string;
  refreshToken: string;
}
