import { useNoticeContext, useWithdrawContext } from '@/app/contexts';
import { useSession } from '@/app/modules/auth/use-cases';
import {
  Button,
  Separator,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from '@/resources/components/ui';
import { NoticeModal, WithdrawModal } from '@/resources/views';

import { AlertHealthCheck, ThemeModeToggle } from '../../base';

import { BreadcrumbsHeader } from './components/BreadcrumbsHeader/BreadcrumbsHeader.component';
import { AppSidebar } from './components';

import { IAppLayoutProps } from './AppLayout.types';
export function AppLayout({ children, breadcrumbs }: IAppLayoutProps) {
  const { handleLogout } = useSession();

  const modalPropsWithdraw = useWithdrawContext(state => state.modalProps);

  const modalPropsNotice = useNoticeContext(state => state.modalProps);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 justify-between px-4'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />

            <Separator
              orientation='vertical'
              className='mr-2 h-4'
            />

            <BreadcrumbsHeader items={breadcrumbs} />
          </div>
          <div className='flex items-center gap-4'>
            <ThemeModeToggle />

            <Button
              variant='destructive'
              className='w-[100px] md:block hidden'
              onClick={handleLogout}
            >
              Sair
            </Button>
          </div>
        </header>

        <AlertHealthCheck />

        <div className='h-100 w-[98%] md:w-[100%] flex flex-col gap-6 mb-48 px-8 py-4 animate-up'>
          {children}

          <WithdrawModal isOpen={modalPropsWithdraw.open} />

          <NoticeModal isOpen={modalPropsNotice.open} />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
