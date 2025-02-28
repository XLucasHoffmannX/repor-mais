import { routes } from '@/app/router/router.constant';
import { AppLayout } from '@/resources/components/layouts/AppLayout/AppLayout.layout';

import {
  TableHistory,
  TableHistoryFilters,
  TableHistoryPagination
} from './components';

export function WithdrawHistoryView() {
  return (
    <AppLayout
      breadcrumbs={[
        { name: 'Histórico', url: routes.history },
        { name: 'Entradas e saídas' }
      ]}
    >
      <section className='w-full'>
        <div className='w-full'>
          <h1 className='font-bold text-3xl'>Histórico</h1>
          <TableHistoryFilters />

          <div className='mt-4'>
            <TableHistory />

            <TableHistoryPagination />
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
