import { type LucideIcon, Megaphone } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useNoticeContext } from '@/app/contexts';
import { useGetGenerateAndAllNotices } from '@/app/modules/notice/use-cases';
import {
  Badge,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/resources/components/ui';

export function NavProjects({
  projects
}: {
  projects: {
    title: string;
    url: string;
    icon: LucideIcon;
    dropdown?: boolean;
  }[];
}) {
  const { handleChangeModal } = useNoticeContext();

  const { noticesList } = useGetGenerateAndAllNotices({});

  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel>Geral</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map(item => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton
              asChild
              isActive={window.location.pathname === item.url}
            >
              <Link to={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link
              to='#botice'
              onClick={() => {
                handleChangeModal({ open: true });
              }}
            >
              <Megaphone />
              <div className='flex items-center gap-1'>
                <span>Avisos</span>

                {noticesList && noticesList.length > 0 && (
                  <Badge
                    className='animate-pulse'
                    variant='destructive'
                  >
                    <p className='text-xs'>{noticesList.length}</p>
                  </Badge>
                )}
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}
