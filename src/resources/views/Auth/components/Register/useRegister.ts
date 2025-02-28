import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/app/contexts/auth/useAuth.context';
import { useRegisterUser } from '@/app/modules/auth/use-cases';
import { axiosErrorHandler } from '@/shared/utils';

import { registerSchema, RegisterSchemaType } from './register.schema';

export function useRegister() {
  const methods = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema)
  });
  const navigate = useNavigate();
  const { handleSetUserAuth } = useAuthContext();

  const { mutateRegister, isPendingMutateRegister } = useRegisterUser();

  async function onSubmit(data: RegisterSchemaType) {
    try {
      const response = await mutateRegister({
        email: data.email,
        name: data.name,
        password: data.password
      });

      const { token } = response;

      handleSetUserAuth(token);

      navigate('/app');
      console.log(data);
    } catch (error: unknown) {
      axiosErrorHandler(error);
    }
  }

  const disabledContinue =
    !methods.watch('email') ||
    !methods.watch('password') ||
    !methods.watch('name');

  return {
    handleSubmit: methods.handleSubmit(onSubmit),
    errors: methods.formState.errors,
    methods,
    disabledContinue,
    isLoading: isPendingMutateRegister
  };
}
