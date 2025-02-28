import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/resources/components/ui';

import { IBreadcrumbsHeaderProps } from './BreadcrumbsHeader.types';
export function BreadcrumbsHeader({ items }: IBreadcrumbsHeaderProps) {
  return (
    <>
      {items &&
        items?.length > 0 &&
        items.map((bread, index) => (
          <Breadcrumb key={`${bread.name}-${index}`}>
            <BreadcrumbList>
              {bread.name && bread.url && (
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink to={bread.url}>{bread.name}</BreadcrumbLink>
                </BreadcrumbItem>
              )}

              {bread.name && !bread.url && (
                <BreadcrumbItem>
                  <BreadcrumbPage>{bread.name}</BreadcrumbPage>
                </BreadcrumbItem>
              )}

              {index < items.length - 1 && (
                <BreadcrumbSeparator className='hidden md:block' />
              )}
            </BreadcrumbList>
          </Breadcrumb>
        ))}
    </>
  );
}
