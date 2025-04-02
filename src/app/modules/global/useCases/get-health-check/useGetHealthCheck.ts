import { useQueryCache } from '@/app/cache';

import { GlobalQueryKeys } from '../../keys/global.keys';
import GlobalService from '../../services/Global.service';

export function useGetHealthCheck() {
  const { data, isLoading } = useQueryCache({
    queryKey: [GlobalQueryKeys['GET_HEALTH_CHECK']],
    queryFn: GlobalService.healthCheck,
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true
  });

  return {
    health: data,
    isLoadingHealthCheck: isLoading
  };
}
