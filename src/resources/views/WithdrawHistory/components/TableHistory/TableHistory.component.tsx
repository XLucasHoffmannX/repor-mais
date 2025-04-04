import { ptBR } from 'date-fns/locale';
import { format, toZonedTime } from 'date-fns-tz';
import Lottie from 'react-lottie';

import { RowSkeleton } from '@/resources/components/base';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/resources/components/ui';
import EmptyAnimation from '@/shared/animations/empty-list-anm.json';
import { useAnimationLottie } from '@/shared/hooks';

import { useTableHistory } from './useTableHistory';

export function TableHistory() {
  const defaultOptions = useAnimationLottie(EmptyAnimation);

  const { withdrawList, isLoading } = useTableHistory();

  const isEmpty =
    !isLoading && withdrawList?.items && withdrawList.items.length === 0;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Produto</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Tipo</TableHead>
          <TableHead>Responsável</TableHead>
          <TableHead>Data</TableHead>
          <TableHead>Unidade</TableHead>
          <TableHead>Descrição</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && (
          <RowSkeleton
            cells={9}
            rows={5}
            heightRow={50}
          />
        )}

        {withdrawList?.items &&
          withdrawList.items.length > 0 &&
          withdrawList.items.map(wtd => (
            <TableRow key={`${wtd.id}-${wtd.reason}`}>
              <TableCell>{wtd.product?.name || '—'} </TableCell>
              <TableCell>
                <p
                  className={`font-semibold ${
                    wtd.type === 'remove' ? 'text-red-500' : 'text-blue-600'
                  }`}
                >
                  {' '}
                  {wtd.type === 'remove'
                    ? `-${wtd.quantity}`
                    : `+${wtd.quantity}`}
                </p>
              </TableCell>
              <TableCell>
                {wtd.type == 'remove' ? 'Retirada' : 'Entrada'}{' '}
              </TableCell>

              <TableCell>{wtd.user?.name || '—'} </TableCell>
              <TableCell>
                {wtd.createdAt
                  ? format(
                      toZonedTime(new Date(wtd.createdAt), 'America/Sao_Paulo'),
                      'dd/MM/yyyy HH:mm',
                      { locale: ptBR }
                    )
                  : 'N/A'}
              </TableCell>
              <TableCell>{wtd.unit?.name || '—'} </TableCell>
              <TableCell>{wtd.reason || '—'}</TableCell>
            </TableRow>
          ))}

        {isEmpty && (
          <TableRow>
            <TableCell
              colSpan={9}
              className='text-center h-[150px]'
            >
              <div className='flex flex-col items-center justify-center p-6'>
                <div className='w-[200px] h-[200px] mt-4'>
                  <Lottie options={defaultOptions} />
                </div>
                <p className='text-base font-bold mt-4'>
                  Nenhum produto encontrado
                </p>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
