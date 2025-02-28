import { useQueryCache } from '@/app/cache';

import { AuthQueryKeys } from '../../keys/auth.keys';
import { AuthService } from '../../service';

import { IUseGetValidateAuthProps } from '../../types/auth.types';

export function useGetValidateAuth({ enabled }: IUseGetValidateAuthProps) {
  const { data, isLoading } = useQueryCache({
    queryKey: [AuthQueryKeys['VALIDATE-AUTH']],
    queryFn: AuthService.validateAuthService,
    enabled: enabled
  });

  return {
    cachedUserLogged: data,
    isLoadingUserLogged: isLoading
  };
}
