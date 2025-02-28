import { RotateCcw } from 'lucide-react';

import { useProductContext, useWithdrawContext } from '@/app/contexts';
import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger
} from '@/resources/components/ui';

import { useTableFilter } from './useTableFilters';

export function TableFilters() {
  const {
    onChangeSetSearchTerm,
    onChangeBarcodeSearchTerm,
    units,
    handleReloadDataTable
  } = useTableFilter();

  const { handleChangeFilter, filters } = useProductContext();

  // Buscar o nome da unidade correspondente ao valor selecionado
  const selectedUnit = units?.find(unit => unit.id === filters.unit);

  const handleChangeModal = useWithdrawContext(
    state => state.handleChangeModal
  );

  return (
    <div className='mt-4 flex items-center gap-4 flex-wrap'>
      <Input
        placeholder='Buscar por nome do produto...'
        className='w-[250px]'
        onChange={e => {
          onChangeSetSearchTerm(e.target.value);
        }}
        disabled={!!filters.barcode}
      />

      <Input
        placeholder='Código de barras'
        className='w-[250px]'
        onChange={e => {
          onChangeBarcodeSearchTerm(e.target.value);
        }}
        disabled={!!filters.search}
      />

      <Select
        value={filters.unit ?? ''}
        onValueChange={value => handleChangeFilter({ unit: value })}
      >
        <SelectTrigger className='w-[200px]'>
          {/* Exibir o nome da unidade selecionada ou "Todos os estoques" */}
          {selectedUnit ? selectedUnit.name : 'Todos os estoques'}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='none'>Todos</SelectItem>
            {units?.map(unt => (
              <SelectItem
                value={unt.id ?? ''}
                key={unt.id}
              >
                {unt.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        variant='outline'
        onClick={() => handleChangeModal({ open: true, context: 'remove' })}
      >
        Retirada
      </Button>

      <Button
        variant='outline'
        onClick={() => handleChangeModal({ open: true, context: 'entry' })}
      >
        Entrada
      </Button>

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
