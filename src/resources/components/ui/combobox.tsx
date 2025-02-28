import * as React from 'react';

import { Check, ChevronsUpDown } from 'lucide-react';

import { useTheme } from '@/shared/hooks';
import { cn } from '@/shared/lib/utils';

import {
  Button,
  Command,
  CommandInput,
  CommandList,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton
} from './';

interface IComboBoxProps {
  options: { value: string; label: string }[];
  selectedValue: string;
  searchTerm: string;
  onChange: (value: string) => void;
  onSearch: (searchTerm: string) => void; // 🔥 Adicionado
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  width?: string;
  isLoading?: boolean;
  isError?: boolean;
}

export function ComboBox({
  options,
  selectedValue,
  onChange,
  onSearch,
  searchTerm,
  placeholder = 'Selecione...',
  searchPlaceholder = 'Buscar...',
  emptyMessage = 'Nenhum item encontrado.',
  width = 'w-[200px]',
  isLoading,
  isError
}: IComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const { theme } = useTheme();

  const selectedOption = options.find(option => option.value === selectedValue);
  const displayText =
    searchTerm && !selectedOption
      ? placeholder
      : selectedOption?.label || placeholder;

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className={cn(
            `${width} justify-between h-[50px] rounded ${
              isError && 'border border-red-500 text-red-500'
            }`
          )}
        >
          {displayText}
          <ChevronsUpDown className='opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={`${width} p-0`}
        onWheel={e => e.stopPropagation()}
      >
        <Command>
          <CommandInput
            placeholder={searchPlaceholder}
            className='h-9'
            value={searchTerm}
            onValueChange={value => onSearch(value)}
          />
          <CommandList className='overflow-auto'>
            <ul className='mt-2 max-h-[200px] overflow-auto rounded-md '>
              {isLoading ? (
                Array.from({ length: 3 }).map((item, index) => (
                  <li
                    key={`${index}-${item}`}
                    className='p-1'
                  >
                    <Skeleton className='h-[50px]' />
                  </li>
                ))
              ) : options.length > 0 ? (
                options.map(option => (
                  <li
                    key={option.value}
                    className={cn(
                      'flex items-center justify-between p-4 cursor-pointer rounded-md hover:bg-gray-100 border-none',
                      selectedValue === option.value && 'bg-gray-200',
                      theme === 'dark' &&
                        'bg-transparent text-white hover:text-black'
                    )}
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                  >
                    {option.label}
                    {selectedValue === option.value && (
                      <Check className='w-4 h-4 text-blue-500' />
                    )}
                  </li>
                ))
              ) : (
                <li className='p-4 text-gray-500 text-sm '>{emptyMessage}</li>
              )}
            </ul>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
