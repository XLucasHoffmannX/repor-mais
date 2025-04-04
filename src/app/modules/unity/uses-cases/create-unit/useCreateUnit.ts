import { useMutationCache } from '@/app/cache';

import { UnityhMutationKeys } from '../../keys/unity.keys';
import { UnityService } from '../../service';

import { ICreateUnitPayload } from '../../types/unity.types';

export function useCreateUnitMutation() {
  const { mutateAsync, isPending, isError } = useMutationCache({
    mutationKey: [UnityhMutationKeys['CREATE-UNIT']],
    mutationFn: (data: ICreateUnitPayload) => {
      return UnityService.createUnit(data);
    }
  });

  return {
    mutateAddUnit: mutateAsync,
    isPendingMutate: isPending,
    isError
  };
}
