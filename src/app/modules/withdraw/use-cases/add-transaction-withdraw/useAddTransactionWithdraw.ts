import { useMutationCache } from '@/app/cache';

import { WithdrawMutationKeys } from '../../keys/withdraw.keys';
import { WithdrawService } from '../../service';

import { IAddTransactionWithdrawPayoad } from '../../types/withdraw.types';

export function useAddTransactionWithdraw() {
  const { mutateAsync, isPending, isError } = useMutationCache({
    mutationKey: [WithdrawMutationKeys['CREATE-WITHDRAW']],
    mutationFn: (data: IAddTransactionWithdrawPayoad) => {
      return WithdrawService.addTransactionWithdraw(data);
    }
  });

  return {
    mutateAddTransactionWithdraw: mutateAsync,
    isPendingMutate: isPending,
    isError
  };
}
