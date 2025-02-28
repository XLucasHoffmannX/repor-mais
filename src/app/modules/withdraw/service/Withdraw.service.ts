import { HttpAuth } from '@/app/api';
import { IWithdraw } from '@/shared/types';
import { IPaginationDefaultResponse } from '@/shared/types/paginate.types';

import {
  IAddTransactionWithdrawPayoad,
  IGetAllWithdrawsPayload
} from '../types/withdraw.types';

class WithdrawService {
  async addTransactionWithdraw(payload: IAddTransactionWithdrawPayoad) {
    const { data } = await HttpAuth.post('/withdraw', payload);

    return data;
  }

  async getAllWithdraws(
    payload: IGetAllWithdrawsPayload
  ): Promise<IPaginationDefaultResponse<IWithdraw>> {
    const { data } = await HttpAuth.get<IPaginationDefaultResponse<IWithdraw>>(
      `/withdraw/`,
      {
        params: {
          limit: payload.limit,
          page: payload.page,
          search: payload.search,
          type: payload.type
        }
      }
    );

    console.log('data', data);

    return data;
  }
}

export default new WithdrawService();
