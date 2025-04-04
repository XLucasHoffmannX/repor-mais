import { useQueryCache } from '@/app/cache';

import { UnityQueryKeys } from '../../keys/unity.keys';
import { UnityService } from '../../service';

import { IUseGetAllUnits, IUseGetAllUnitsProps } from '../../types/unity.types';

export function useGetAllUnits(payload: IUseGetAllUnitsProps): IUseGetAllUnits {
  const { data, isLoading } = useQueryCache({
    queryKey: [UnityQueryKeys['GET-ALL-UNITS'], payload],
    queryFn: async () =>
      await UnityService.getAllUnits({ search: payload.search }),
    enabled: payload.enabled
  });

  return {
    units: data,
    isLoadingUnits: isLoading
  };
}
