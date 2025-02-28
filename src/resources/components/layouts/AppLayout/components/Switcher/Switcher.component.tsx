import { BetweenHorizontalStart, ChevronsUpDown, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { useShallow } from 'zustand/react/shallow';

import { useUnityContext } from '@/app/contexts';
import { useSession } from '@/app/modules/auth/use-cases';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  Skeleton,
  useSidebar
} from '@/resources/components/ui';

import { useSwitcher } from './useSwitcher';

export function Switcher() {
  const { isMobile } = useSidebar();

  const { units, isLoadingUnits } = useSwitcher();

  const [unity, handleSetUnity] = useUnityContext(
    useShallow(state => [state.unity, state.handleSetUnity])
  );
  const { company } = useSession();

  if (isLoadingUnits) {
    return <Skeleton className='h-[50px] w-[240px]' />;
  }

  const verifySwitch = !isLoadingUnits && units && units?.length > 0;

  return (
    <SidebarMenu>
      <SidebarMenuItem className='border rounded-md'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                <BetweenHorizontalStart className='size-4' />
              </div>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {verifySwitch ? unity?.name : company?.name}
                </span>

                <span className='truncate text-xs'>{company?.name}</span>
              </div>
              <ChevronsUpDown className='ml-auto' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            align='start'
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className='text-xs text-muted-foreground'>
              Unidades
            </DropdownMenuLabel>

            {units?.map((unt, index) => (
              <DropdownMenuItem
                key={unt.name}
                onClick={() => {
                  handleSetUnity(unt);
                  toast.info(`Loja alterada para ${unt.name}`);
                }}
                className='gap-2 p-2'
              >
                <div className='flex size-6 items-center justify-center rounded-sm border'>
                  <BetweenHorizontalStart className='size-4 shrink-0' />
                </div>
                {unt.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className='gap-2 p-2'>
              <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                <Plus className='size-4' />
              </div>
              <div className='font-medium text-muted-foreground'>
                Adicionar unidade
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
