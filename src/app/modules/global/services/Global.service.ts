import axios from 'axios';

import { Http } from '@/app/api';
import { IHealthCheck } from '@/shared/types';

import { GetViaCepAddressByPostalCodeMapper } from './mappers';

import {
  IGetViaCepAddressByPostalCodePayload,
  IPersistenceViaCepAddress,
  IViaCepAddress
} from '../types/global.types';

class GlobalService {
  async getViaCepAddressByPostalCode({
    postalCode
  }: IGetViaCepAddressByPostalCodePayload): Promise<IViaCepAddress | null> {
    const { data } = await axios.get<IPersistenceViaCepAddress>(
      `https://viacep.com.br/ws/${postalCode}/json/`
    );

    return data.erro ? null : GetViaCepAddressByPostalCodeMapper.toDomain(data);
  }

  async healthCheck(): Promise<IHealthCheck> {
    const { data } = await Http.get<IHealthCheck>('/health');

    return data;
  }
}

export default new GlobalService();
