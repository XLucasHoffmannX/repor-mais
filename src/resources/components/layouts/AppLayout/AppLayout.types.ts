import { ReactNode } from 'react';

export type BreadcrumbItemType = {
  name: string;
  url?: string;
};

export interface IAppLayoutProps {
  children: ReactNode;
  breadcrumbs?: BreadcrumbItemType[];
}
