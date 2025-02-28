import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

import { Button } from '@/resources/components/ui/button';
import { Calendar } from '@/resources/components/ui/calendar';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Popover,
  PopoverContent,
  PopoverTrigger
} from './';

export function DatePicker({
  control,
  name,
  displayName
}: {
  control: any;
  name: string;
  displayName: string | undefined;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel className='text-base'>
            {displayName ?? 'Inserir data'}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={'outline'}
                  className={`md:w-[400px] pl-3 text-left font-normal h-[50px] rounded ${
                    !field.value ? 'text-muted-foreground' : ''
                  }`}
                >
                  {field.value
                    ? format(new Date(field.value), 'dd/MM/yyyy')
                    : 'Selecionar data'}
                  <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className='w-auto p-0'
              align='start'
            >
              <Calendar
                mode='single'
                selected={field.value ? new Date(field.value) : undefined}
                onSelect={date => field.onChange(date?.toISOString())}
                disabled={date => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
