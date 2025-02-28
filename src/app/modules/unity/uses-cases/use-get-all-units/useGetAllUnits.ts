import { useQueryCache } from '@/app/cache';

import { UnityQueryKeys } from '../../keys/unity.keys';
import { UnityService } from '../../service';

import { IUseGetAllUnits, IUseGetAllUnitsProps } from '../../types/unity.types';

export function useGetAllUnits({
  enabled
}: IUseGetAllUnitsProps): IUseGetAllUnits {
  const { data, isLoading } = useQueryCache({
    queryKey: [UnityQueryKeys['GET-ALL-UNITS']],
    queryFn: UnityService.getAllUnits,
    enabled: enabled
  });

  return {
    units: data,
    isLoadingUnits: isLoading
  };
}
