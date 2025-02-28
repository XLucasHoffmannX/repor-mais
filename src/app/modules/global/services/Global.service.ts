import axios from 'axios';

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
}

export default new GlobalService();
