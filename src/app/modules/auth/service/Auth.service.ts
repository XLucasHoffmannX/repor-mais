import { Http, HttpAuth } from '@/app/api';

import {
  IAuthPayload,
  IAuthResponse,
  IRegisterPayload,
  IRegisterResponse,
  IValidateAuthResponse
} from '../types/auth.types';

class AuthService {
  async loginService(payload: IAuthPayload): Promise<IAuthResponse> {
    const { data } = await Http.post('/user/login', payload);

    return data;
  }

  async registerService(payload: IRegisterPayload): Promise<IRegisterResponse> {
    const { data } = await Http.post('/user/register', payload);

    return data;
  }

  async validateAuthService(): Promise<IValidateAuthResponse> {
    const { data } = await HttpAuth.get('/user/auth');

    return data;
  }
}

export default new AuthService();
