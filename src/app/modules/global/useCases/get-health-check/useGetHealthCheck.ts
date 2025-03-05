import { useQueryCache } from '@/app/cache';

import { GlobalQueryKeys } from '../../keys/global.keys';
import GlobalService from '../../services/Global.service';

export function useGetHealthCheck() {
  const { data, isLoading } = useQueryCache({
    queryKey: [GlobalQueryKeys['GET_HEALTH_CHECK']],
    queryFn: GlobalService.healthCheck,
    refetchInterval: 120000,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: true
  });

  return {
    health: data,
    isLoadingHealthCheck: isLoading
  };
}
