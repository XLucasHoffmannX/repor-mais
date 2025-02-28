import { LucideMoon, LucideSun } from 'lucide-react';

import { Button } from '@/resources/components/ui/button';
import { useTheme } from '@/shared/hooks';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../../ui';

export function ThemeModeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='flex items-center justify-center'
        >
          {theme === 'light' ? (
            <LucideSun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          ) : (
            <LucideMoon className='h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className='cursor-pointer'
        >
          Claro
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className='cursor-pointer'
        >
          Escuro
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
