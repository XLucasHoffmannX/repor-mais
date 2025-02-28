import { useQueryCache } from '@/app/cache';

import { WithdrawQueryKeys } from '../../keys/withdraw.keys';
import { WithdrawService } from '../../service';

import { IUseGetAllWithdrawsPayload } from '../../types/withdraw.types';

export function useGetAllWithdraws(payload: IUseGetAllWithdrawsPayload) {
  const { data, isFetching } = useQueryCache({
    queryKey: [WithdrawQueryKeys['GET_ALL_WITHDRAWS'], payload],
    queryFn: async () => await WithdrawService.getAllWithdraws(payload),
    enabled: payload.enabled
  });

  return {
    withdrawList: data,
    isFetching
  };
}
