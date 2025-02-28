import { useQueryCache } from '@/app/cache';

import { GlobalQueryKeys } from '../../keys/global.keys';
import GlobalService from '../../services/Global.service';

import {
  IUseGetViaCepAddressByPostalCode,
  IUseGetViaCepAddressByPostalCodeParams
} from '../../types/global.types';

export function useGetViaCepAddressByPostalCode({
  postalCode,
  enabled
}: IUseGetViaCepAddressByPostalCodeParams): IUseGetViaCepAddressByPostalCode {
  const { data, isFetching, isSuccess, isError } = useQueryCache({
    queryKey: [GlobalQueryKeys.GET_VIA_CEP_ADDRESS_BY_POSTAL_CODE, postalCode],
    queryFn: async () =>
      await GlobalService.getViaCepAddressByPostalCode({ postalCode }),
    enabled: enabled ?? true
  });

  return {
    address: data,
    isFetchingAddress: isFetching,
    isSuccessAddress: isSuccess,
    isErrorAddress: isError
  };
}
