import { useQueryCache } from '@/app/cache';

import { UnityQueryKeys } from '../../keys/unity.keys';
import { UnityService } from '../../service';

import { IUseGetAllUnits, IUseGetAllUnitsProps } from '../../types/unity.types';

export function useGetAllUnits({
  search,
  enabled
}: IUseGetAllUnitsProps): IUseGetAllUnits {
  const { data, isLoading } = useQueryCache({
    queryKey: [UnityQueryKeys['GET-ALL-UNITS'], { search, enabled }],
    queryFn: async () => await UnityService.getAllUnits({ search }),
    enabled: enabled
  });

  return {
    units: data,
    isLoadingUnits: isLoading
  };
}
