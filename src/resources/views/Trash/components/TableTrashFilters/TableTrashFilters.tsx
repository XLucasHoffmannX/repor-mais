import { RotateCcw } from 'lucide-react';

import { Button, Input } from '@/resources/components/ui';

import { useTableTrashFilters } from './useTableTrashFilters';

export function TableTrashFilters() {
  const { handleReloadDataTable, onChangeSetSearchTerm } =
    useTableTrashFilters();

  return (
    <div className='mt-4 flex items-center gap-4 flex-wrap'>
      <Input
        placeholder='Buscar por nome do produto...'
        className='w-[250px]'
        onChange={e => {
          onChangeSetSearchTerm(e.target.value);
        }}
      />

      <Button
        className='bg-green-500 hover:bg-green-400 flex items-center gap-2'
        onClick={() => handleReloadDataTable()}
      >
        <RotateCcw className='size-3' />
        Recarregar
      </Button>
    </div>
  );
}
