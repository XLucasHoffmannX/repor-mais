import { useMutation } from '@tanstack/react-query';

import { AuthMutationKeys } from '../../keys/auth.keys';
import { AuthService } from '../../service';

import { IRegisterPayload } from '../../types/auth.types';

export function useRegisterUser() {
  const { mutateAsync, isPending, isError } = useMutation({
    mutationKey: [AuthMutationKeys.REGISTER],
    mutationFn: (data: IRegisterPayload) => {
      return AuthService.registerService(data);
    }
  });

  return {
    mutateRegister: mutateAsync,
    isPendingMutateRegister: isPending,
    isError
  };
}
