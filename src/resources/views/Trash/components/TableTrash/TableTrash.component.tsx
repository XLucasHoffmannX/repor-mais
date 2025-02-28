import { ptBR } from 'date-fns/locale';
import { format, toZonedTime } from 'date-fns-tz';
import { ArchiveRestore } from 'lucide-react';
import Lottie from 'react-lottie';

import { RowSkeleton } from '@/resources/components/base';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/resources/components/ui';
import EmptyAnimation from '@/shared/animations/empty-list-anm.json';
import { useAnimationLottie } from '@/shared/hooks';

import { useTableTrash } from './useTableTrash';

export function TableTrash() {
  const defaultOptions = useAnimationLottie(EmptyAnimation);

  const {
    productsTrash,
    isFetchingProductsTrash,
    handleRestoreProduct,
    isPending
  } = useTableTrash();

  const isEmpty =
    !isFetchingProductsTrash && productsTrash && productsTrash.length === 0;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Produto</TableHead>
          <TableHead>Código de barras</TableHead>
          <TableHead>Descrição</TableHead>
          <TableHead>Criado em</TableHead>
          <TableHead>Apagado em</TableHead>
          <TableHead>-</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {isFetchingProductsTrash && (
          <RowSkeleton
            cells={9}
            rows={5}
            heightRow={50}
          />
        )}

        {productsTrash &&
          productsTrash.length > 0 &&
          productsTrash.map((product, index) => (
            <TableRow key={`${index}-${product.id}`}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.barcode || '—'}</TableCell>
              <TableCell>{product.description || '—'}</TableCell>
              <TableCell>
                {product.createdAt
                  ? format(
                      toZonedTime(
                        new Date(product.createdAt),
                        'America/Sao_Paulo'
                      ),
                      'dd/MM/yyyy HH:mm',
                      { locale: ptBR }
                    )
                  : 'N/A'}
              </TableCell>
              <TableCell>
                {product.deletedAt
                  ? format(
                      toZonedTime(
                        new Date(product.deletedAt),
                        'America/Sao_Paulo'
                      ),
                      'dd/MM/yyyy HH:mm',
                      { locale: ptBR }
                    )
                  : 'N/A'}
              </TableCell>
              <TableCell>
                <Button
                  className=' flex items-center gap-2'
                  isLoading={isPending}
                  onClick={() => handleRestoreProduct(product.id ?? '')}
                >
                  <ArchiveRestore className='size-4' />
                  Restaurar
                </Button>
              </TableCell>
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
                  Nenhum produto na lixeira
                </p>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
