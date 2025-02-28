import { AppLayout } from '@/resources/components/layouts/AppLayout/AppLayout.layout';

import { TableFilters, TablePagination, TableStock } from './components';

export function HomeView() {
  return (
    <AppLayout breadcrumbs={[{ name: 'Inicio' }]}>
      <section className='w-full'>
        <div className='w-full'>
          <h1 className='font-bold text-3xl'>Estoque</h1>
          <TableFilters />

          <div className='mt-4'>
            <TableStock />

            <TablePagination />
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
