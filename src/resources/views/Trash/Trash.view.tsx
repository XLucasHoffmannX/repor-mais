import { DatabaseZap } from 'lucide-react';

import { routes } from '@/app/router/router.constant';
import { AppLayout } from '@/resources/components/layouts/AppLayout/AppLayout.layout';

import { TableTrash, TableTrashFilters } from './components';

export function TrashView() {
  return (
    <AppLayout
      breadcrumbs={[
        { name: 'Historico', url: routes.history },
        { name: 'Lixeira' }
      ]}
    >
      <section className='w-full'>
        <div className='w-full'>
          <h1 className='font-bold text-3xl flex items-center gap-2'>
            Lixeira <DatabaseZap />
          </h1>
          <TableTrashFilters />

          <div className='mt-4'>
            <TableTrash />
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
