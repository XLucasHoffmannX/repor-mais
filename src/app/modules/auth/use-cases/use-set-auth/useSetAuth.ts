import { useMutation } from '@tanstack/react-query';

import { AuthMutationKeys } from '../../keys/auth.keys';
import { AuthService } from '../../service';

import { IAuthPayload } from '../../types/auth.types';

export function useSetAuth() {
  const { mutateAsync, isPending, isError } = useMutation({
    mutationKey: [AuthMutationKeys.AUTH],
    mutationFn: (data: IAuthPayload) => {
      return AuthService.loginService(data);
    }
  });

  return { mutateAuth: mutateAsync, isPendingMutateAuth: isPending, isError };
}
