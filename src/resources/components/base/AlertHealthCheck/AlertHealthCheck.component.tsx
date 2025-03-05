import { TriangleAlert } from 'lucide-react';

import { useGetHealthCheck } from '@/app/modules/global';
import { Alert, AlertDescription, AlertTitle } from '@/resources/components/ui';

export function AlertHealthCheck() {
  const { health, isLoadingHealthCheck } = useGetHealthCheck();

  return (
    <>
      {!health && !isLoadingHealthCheck && (
        <div className='p-4'>
          <Alert variant='warning'>
            <TriangleAlert className='h-4 w-4 ' />
            <AlertTitle>Serviço Temporariamente Indisponível</AlertTitle>
            <AlertDescription>
              <p className='mb-2'>
                Não conseguimos estabelecer conexão com a API. Isso pode ser
                causado por:
              </p>
              <ul className='list-disc list-inside space-y-1'>
                <li>Instância em modo de espera.</li>
                <li>Manutenção programada.</li>
                <li>Instabilidade momentânea na infraestrutura.</li>
              </ul>
              <p className='mt-2'>
                Tente recarregar a página ou entre em contato com a equipe
                técnica.
              </p>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </>
  );
}
