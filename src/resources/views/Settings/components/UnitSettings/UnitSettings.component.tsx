import { BookX, Info, SquareArrowOutUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import {
  Card,
  CardHeader,
  CardTitle,
  Input,
  Skeleton,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/resources/components/ui';

import { useUnitSettings } from './useUnitSettings';

export function UnitSettings() {
  const { units, onChangeSetSearchTerm, isLoadingUnits } = useUnitSettings();

  const isEmpty = !isLoadingUnits && units && units.length === 0;

  return (
    <div className='mt-8'>
      <div className='flex flex-col gap-2 mb-3'>
        <h2 className='text-base font-medium flex items-center gap-2'>
          Unidades de estoque:
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className='size-5' />
              </TooltipTrigger>
              <TooltipContent className='bg-black text-white'>
                <p>
                  Unidades de estoque serão limitadas ao máximo 4, por questões
                  de recursos iniciais.
                </p>
                <Link
                  to='#'
                  className='text-blue-600 underline'
                >
                  Saber mais
                </Link>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </h2>
        <span className='text-sm'>1 de 4</span>
      </div>

      <div className='flex gap-4 items-center my-5'>
        <Input
          placeholder='Buscar por nome do produto...'
          className='w-[250px] h-[40px]'
          onChange={e => {
            onChangeSetSearchTerm(e.target.value);
          }}
        />

        {/* <CreateUnitModal /> */}
      </div>

      <div className='flex flex-wrap gap-4 items-center'>
        {isLoadingUnits && <Skeleton className='h-[65px] w-[300px]' />}

        {!isLoadingUnits &&
          units &&
          units.map((unit, index) => (
            <Card
              className='w-[300px] cursor-pointer'
              key={`${unit.id}-unit-${index}`}
            >
              <CardHeader>
                <CardTitle className='flex items-center justify-between'>
                  {unit.name}
                  <SquareArrowOutUpRight className='size-4' />
                </CardTitle>
              </CardHeader>
            </Card>
          ))}

        {isEmpty && (
          <div className='flex flex-col items-center justify-center'>
            <p className='text-base font-bold mt-4 flex items-center gap-2'>
              Nenhuma unidade encontrada <BookX />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
