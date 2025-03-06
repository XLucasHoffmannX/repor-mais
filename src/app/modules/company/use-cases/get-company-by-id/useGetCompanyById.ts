import { useQueryCache } from '@/app/cache';

import { CompanyQueryKeys } from '../../keys/company.keys';
import { CompanyService } from '../../service';

import { IUseGetCompanyByIdPayload } from '../../types/company.types';

export function useGetCompanyById(payload: IUseGetCompanyByIdPayload) {
  const { data, isFetching } = useQueryCache({
    queryKey: [CompanyQueryKeys['GET-COMPANY-BY-ID']],
    queryFn: async () => await CompanyService.getCompanyById(payload),
    enabled: payload.enabled
  });

  return {
    companyReturned: data,
    isFetchingCompanyReturned: isFetching
  };
}
