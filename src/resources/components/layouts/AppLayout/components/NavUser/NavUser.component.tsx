import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles
} from 'lucide-react';

import { useNoticeContext } from '@/app/contexts';
import { useSession } from '@/app/modules/auth/use-cases';
import {
  Avatar,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@/resources/components/ui';

export function NavUser() {
  const { isMobile } = useSidebar();
  const { userAuthenticated, handleLogout } = useSession();
  const handleChangeModal = useNoticeContext(state => state.handleChangeModal);

  return (
    <SidebarMenu>
      <SidebarMenuItem className='border rounded-md mb-2'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarFallback className='rounded-lg'>
                  {userAuthenticated?.name
                    ? userAuthenticated.name.slice(0, 2)
                    : ''}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>
                  {userAuthenticated?.name}
                </span>
                <span className='truncate text-xs'>
                  {userAuthenticated?.email}
                </span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles className='text-green-500 size-5 mx-2' />
                Ver meu plano
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <BadgeCheck className='text-primary size-5 mx-2' />
                Minha conta
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className='text-primary size-5 mx-2' />
                Pagamentos
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleChangeModal({ open: true })}
                className='cursor-pointer'
              >
                <Bell className='text-primary size-5 mx-2' />
                Notificações
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className='text-red-600 size-5 mx-2' />
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
