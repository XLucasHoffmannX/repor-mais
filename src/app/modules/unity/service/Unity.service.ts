import { HttpAuth } from '@/app/api';
import { IUnity } from '@/shared/types';

class UnityService {
  async getAllUnits(): Promise<IUnity[]> {
    const { data } = await HttpAuth.get('/units');

    return data;
  }
}

export default new UnityService();
