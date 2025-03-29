import { routes } from '@/app/router/router.constant';
import { AppLayout } from '@/resources/components/layouts/AppLayout/AppLayout.layout';
import { Separator } from '@/resources/components/ui';

import { CompanySettings, UnitSettings } from './components';

export function SettingsView() {
  return (
    <AppLayout breadcrumbs={[{ name: 'Configurações', url: routes.settings }]}>
      <section className='w-full'>
        <div className='w-full'>
          <h1 className='font-bold text-3xl'>Configurações</h1>

          <div className='mt-4'>
            <CompanySettings />
          </div>

          <Separator className='my-8' />

          <div className='mt-4'>
            <UnitSettings />
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
