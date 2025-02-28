import { Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Form } from '@/resources/components/ui';
import { Button, Input, Label, PasswordInput } from '@/resources/components/ui';

import { useRegister } from './useRegister';

export function Register() {
  const { methods, handleSubmit, errors, disabledContinue, isLoading } =
    useRegister();

  return (
    <div className='animate-up'>
      <Form {...methods}>
        <form
          className='flex flex-col gap-6 bg-secondary p-6 rounded-sm'
          onSubmit={handleSubmit}
        >
          <div className='flex flex-col gap-3 p-1'>
            <div className='flex flex-col gap-2'>
              <Label className='text-base'>Nome completo</Label>
              <Controller
                name='name'
                control={methods.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    className='col-span-3 h-[50px] rounded-xl bg-white text-black'
                    errorMessage={errors.name?.message}
                    placeholder='Insira seu nome completo'
                  />
                )}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label className='text-base'>Email</Label>
              <Controller
                name='email'
                control={methods.control}
                render={({ field }) => (
                  <Input
                    {...field}
                    value={field.value ?? ''}
                    className='col-span-3 h-[50px] rounded-xl bg-white text-black'
                    errorMessage={errors.email?.message}
                    placeholder='Insira seu melhor email'
                  />
                )}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label className='text-base'>Senha</Label>
              <Controller
                name='password'
                control={methods.control}
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    value={field.value ?? ''}
                    className='col-span-3 h-[50px] rounded-xl bg-white text-black'
                    errorMessage={errors.password?.message}
                    iconOn='text-primary'
                    iconOff='text-primary'
                    placeholder='Insira uma senha forte'
                  />
                )}
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label className='text-base'>Confirmar senha</Label>
              <Controller
                name='confirmPassword'
                control={methods.control}
                render={({ field }) => (
                  <PasswordInput
                    {...field}
                    value={field.value ?? ''}
                    className='col-span-3 h-[50px] rounded-xl bg-white text-black'
                    errorMessage={errors.confirmPassword?.message}
                    iconOn='text-primary'
                    iconOff='text-primary'
                    placeholder='Confirme sua senha'
                  />
                )}
              />
            </div>
          </div>

          <Button
            className='text-white hover:scale-105 h-[50px] transition-all duration-300 flex items-center justify-center gap-[8px] px-[24px] rounded-full transform active:scale-90 hover:opacity-[80%] w-full'
            type='submit'
            disabled={disabledContinue}
            isLoading={isLoading}
          >
            Cadastrar
          </Button>

          <p className='text-muted font-medium text-neutral-400 text-sm text-center'>
            Já possui uma conta? {''}
            <Link
              to='/login'
              className='underline'
            >
              Entre aqui.
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
