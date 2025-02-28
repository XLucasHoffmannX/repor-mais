import { RotateCcw } from 'lucide-react';

import {
  Button,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/resources/components/ui';

import { useTableHistoryFilters } from './useTableHistoryFilters';

export function TableHistoryFilters() {
  const {
    handleReloadDataTable,
    onChangeSetSearchTerm,
    onChangeSetTypeFilter
  } = useTableHistoryFilters();

  return (
    <div className='mt-4 flex items-center gap-4 flex-wrap'>
      <Input
        placeholder='Buscar por nome do produto...'
        className='w-[250px]'
        onChange={e => {
          onChangeSetSearchTerm(e.target.value);
        }}
      />

      <Select onValueChange={value => onChangeSetTypeFilter(value)}>
        <SelectTrigger className='w-[200px]'>
          <SelectValue placeholder='Filtrar por tipo' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value='all'>Todos</SelectItem>
            <SelectItem value='entry'>Entrada</SelectItem>
            <SelectItem value='remove'>Retirada</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

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
