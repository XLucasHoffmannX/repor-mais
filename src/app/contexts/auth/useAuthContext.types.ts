import { ICompany, IUser } from '@/shared/types';

export type ITokenType = {
  exp: number;
  sub: string;
  role: string;
  id: number;
  empresa: string;
  expo: number;
};

export interface IUseAuthContext {
  userAuthenticated: IUser | null;
  company: ICompany | null;
  expiresIn: number | null;
  handleSetUserAuth: (token: string, user?: IUser) => void;
  handleLogout: () => void;
}
