import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail
} from '@/resources/components/ui';

import { NavMain, NavProjects, NavUser, Switcher } from '../';

import { sidebarItems } from './sidebaritems.constant';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible='icon'
      {...props}
    >
      <SidebarHeader>
        <Switcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarItems.principalItems} />

        <NavProjects projects={sidebarItems.moreItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
