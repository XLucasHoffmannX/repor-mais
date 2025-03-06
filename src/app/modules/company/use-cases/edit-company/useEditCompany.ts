import { useMutationCache } from '@/app/cache';

import { CompanyMutationKeys } from '../../keys/company.keys';
import { CompanyService } from '../../service';

import {
  IEditCompanyPayload,
  IUseEditCompanyPayload
} from '../../types/company.types';

export function useEditCompany({ companyId }: IUseEditCompanyPayload) {
  const { mutateAsync, isPending, isError } = useMutationCache({
    mutationKey: [CompanyMutationKeys['EDIT-COMPANY']],
    mutationFn: (data: IEditCompanyPayload) => {
      return CompanyService.editCompany(data, companyId);
    }
  });

  return {
    mutateEditCompany: mutateAsync,
    isPendingMutate: isPending,
    isError
  };
}
