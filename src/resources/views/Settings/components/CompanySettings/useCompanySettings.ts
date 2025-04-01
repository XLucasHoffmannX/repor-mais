import { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useAuthContext } from '@/app/contexts';
import { useSession } from '@/app/modules/auth/use-cases';
import { CompanyQueryKeys } from '@/app/modules/company/keys/company.keys';
import {
  useEditCompany,
  useGetCompanyById
} from '@/app/modules/company/use-cases';

import {
  companySettingsSchema,
  CompanySettingsSchemaType
} from './company-settings.schema';

export function useCompanySettings() {
  const { companyId } = useSession();
  const queryClient = useQueryClient();

  const { handleChangeCompany } = useAuthContext();

  const { companyReturned, isFetchingCompanyReturned } = useGetCompanyById({
    companyId: companyId ?? '',
    enabled: !!companyId
  });

  const methods = useForm<CompanySettingsSchemaType>({
    resolver: zodResolver(companySettingsSchema),
    defaultValues: {
      name: ''
    }
  });

  useEffect(() => {
    if (companyReturned) {
      methods.reset({
        name: companyReturned.name ?? ''
      });
    }
  }, [companyReturned, methods]);

  const { mutateEditCompany, isPendingMutate } = useEditCompany({
    companyId: companyId ?? ''
  });

  async function onSubmit(data: CompanySettingsSchemaType) {
    try {
      if (data.name === companyReturned?.name) {
        return;
      }

      if (companyReturned) {
        queryClient.invalidateQueries({
          queryKey: [CompanyQueryKeys['GET-COMPANY-BY-ID'], companyId ?? '']
        });

        await mutateEditCompany({ name: data.name });

        handleChangeCompany({ ...companyReturned, name: data.name });

        toast.success(`Empresa atualizada com sucesso!`);
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.message ||
        'Não foi possível salvar o produto!';

      toast.error(errorMessage);
    }
  }

  return {
    methods,
    handleSubmit: methods.handleSubmit(onSubmit),
    errors: methods.formState.errors,
    control: methods.control,
    isLoading: isFetchingCompanyReturned,
    isPendingMutate,
    company: companyReturned
  };
}
