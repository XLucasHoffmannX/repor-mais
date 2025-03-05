import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';

import { useSession } from '@/app/modules/auth/use-cases';
import { AlertHealthCheck } from '@/resources/components/base';
import { Button, Switch } from '@/resources/components/ui';
import Animate from '@/shared/animations/animation-login.json';
import { useAnimationLottie, useTheme } from '@/shared/hooks';
import Logo from '@/shared/images/repormais.svg';

import { Login, Register } from './components';

import { IAuthProps } from './Auth.types';

export function AuthView({ context }: IAuthProps) {
  const defaultOptions = useAnimationLottie(Animate);
  const { authenticated } = useSession();

  const { theme, setTheme } = useTheme();

  return (
    <div className='h-screen flex flex-col'>
      {/* Header */}
      <div className='flex-none flex items-center justify-center p-4'>
        <div className='flex items-center gap-2'>
          <img
            src={Logo}
            className='size-8'
          />
          <p className='font-bold text-2xl hidden md:block'>repor+</p>
        </div>
      </div>

      {/* Content */}
      <div className='flex-1 p-4 flex flex-col items-center justify-center'>
        <div className='flex flex-col md:flex-row items-center gap-8'>
          {/* content left */}
          <div className='flex flex-col md:w-[440px] w-96'>
            <div className='md:w-[440px] w-full'>
              <AlertHealthCheck />
            </div>
            <div className='flex flex-col items-center gap-2 '>
              <div className='flex flex-col items-center'>
                <h1 className='font-bold text-6xl'>repor+</h1>
                <span className='font-extralight text-base'>
                  Gerencie seu estoque de forma simples
                </span>
              </div>

              <div className='mt-8 w-full flex flex-col gap-4'>
                {context === 'login' && <Login />}

                {context === 'register' && <Register />}

                {!context && (
                  <div className='animate-up bg-secondary p-6 rounded-sm'>
                    <p className='text-muted font-medium text-neutral-400 text-sm text-center'>
                      Não perca tempo , entre ou crie sua conta para começar.
                    </p>
                    <div className='flex flex-col gap-5  mt-[34px]'>
                      <Link to={authenticated ? '/app' : '/login'}>
                        <Button className='hover:scale-105 h-[50px] transition-all duration-300 flex items-center justify-center gap-[8px] px-[24px] rounded-full transform active:scale-90 hover:opacity-[80%] w-full'>
                          {authenticated ? 'Continuar' : 'Entrar'}
                        </Button>
                      </Link>

                      <Link to='/register'>
                        <Button className='text-black hover:scale-105 bg-white h-[50px] transition-all duration-300 flex items-center justify-center gap-[8px] px-[24px] border rounded-full transform active:scale-90 hover:opacity-[80%] w-full hover:text-secondary'>
                          Cadastre-se
                        </Button>
                      </Link>
                    </div>
                    <p className='text-muted font-medium text-neutral-600 text-sm mt-6 text-center'>
                      Criando uma conta, você concorda com todos os nossos {''}
                      <Link
                        to='/terms-of-use'
                        className='underline'
                      >
                        termos e condições.
                      </Link>
                    </p>
                  </div>
                )}
              </div>
              <div className='mt-4 w-full flex items-center justify-center gap-2'>
                <span>Modo noturno</span>
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={() =>
                    setTheme(theme === 'light' ? 'dark' : 'light')
                  }
                />
              </div>
            </div>
          </div>

          {/* content right */}
          <div className='pointer-events-none  flex flex-col gap-4 items-center'>
            <div className='size-96 hidden md:block'>
              <Lottie options={defaultOptions} />
            </div>

            <p className='font-extralight text-sm'>
              Total de 120 unidades gerenciadas 💙
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='flex-none flex items-center justify-center p-4'>
        <p className='font-extralight text-xs'>Desenvolvido por Hoffmann</p>
      </div>
    </div>
  );
}
