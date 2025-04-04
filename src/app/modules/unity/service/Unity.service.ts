import { HttpAuth } from '@/app/api';
import { IUnity } from '@/shared/types';

import { ICreateUnitPayload, IGetAllUnitsPayload } from '../types/unity.types';

class UnityService {
  async getAllUnits(payload: IGetAllUnitsPayload): Promise<IUnity[]> {
    const { data } = await HttpAuth.get('/units', {
      params: {
        ...(payload.search && { search: payload.search })
      }
    });

    return data;
  }

  async createUnit(payload: ICreateUnitPayload): Promise<IUnity> {
    const { data } = await HttpAuth.post('/units', payload);

    return data;
  }
}

export default new UnityService();
