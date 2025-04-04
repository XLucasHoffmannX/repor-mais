import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { UnityQueryKeys } from '@/app/modules/unity/keys/unity.keys';
import { useCreateUnitMutation } from '@/app/modules/unity/uses-cases/create-unit/useCreateUnit';
import { axiosErrorHandler } from '@/shared/utils';

import { createUnitSchema, CreateUnitySchemaType } from './create-unit.schema';

import { IUseCreateUnitModalProps } from './CreateUnitModal.types';

export function useCreateUnitModal({
  onChangeSetModalOpened
}: IUseCreateUnitModalProps) {
  const methods = useForm<CreateUnitySchemaType>({
    resolver: zodResolver(createUnitSchema)
  });

  const queryClient = useQueryClient();

  const { mutateAddUnit, isPendingMutate } = useCreateUnitMutation();

  async function onSubmit(data: CreateUnitySchemaType) {
    try {
      const res = await mutateAddUnit(data);

      methods.reset();

      if (res.id) {
        queryClient.resetQueries({
          queryKey: [UnityQueryKeys['GET-ALL-UNITS']]
        });
      }

      toast.success(`Unidade ${res.name} adicionada com sucesso`);

      onChangeSetModalOpened(false);
    } catch (error) {
      onChangeSetModalOpened(false);

      axiosErrorHandler(error);
    }
  }

  return {
    methods,
    handleSubmit: methods.handleSubmit(onSubmit),
    errors: methods.formState.errors,
    control: methods.control,
    isPendingMutate
  };
}
