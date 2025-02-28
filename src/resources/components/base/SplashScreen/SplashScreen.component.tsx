import { LucideLoader2 } from 'lucide-react';

import { cn } from '@/shared/lib/utils';

import { ISplashScreen } from './SplashScreen.types';

export function SplashScreen({ description }: ISplashScreen) {
  return (
    <div
      className={cn(
        'h-screen w-screen flex flex-col items-center justify-center gap-6 bg-white text-black overflow-hidden'
      )}
    >
      <LucideLoader2 className='text-6xl text-primary animate-spin size-12' />

      <p className='text-xl text-muted font-bold animate-up'>
        {description ? description : 'Carregando...'}
      </p>
    </div>
  );
}
