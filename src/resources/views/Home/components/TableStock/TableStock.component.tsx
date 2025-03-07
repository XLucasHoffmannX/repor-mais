import { Fragment } from 'react';

import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { EllipsisVertical, Eye, EyeOff } from 'lucide-react';
import Lottie from 'react-lottie';
import { Link } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';

import { useProductContext } from '@/app/contexts';
import { routes } from '@/app/router/router.constant';
import { RowSkeleton } from '@/resources/components/base';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/resources/components/ui';
import EmptyAnimation from '@/shared/animations/empty-list-anm.json';
import { useAnimationLottie } from '@/shared/hooks';

import { RemoveConfirmationModal } from '../RemoveConfirmationModal/RemoveConfirmationModal.component';

import { useTableStock } from './useTableStock';

export function TableStock() {
  const defaultOptions = useAnimationLottie(EmptyAnimation);

  const {
    productList,
    isLoading,
    showCost,
    handleChangeShowCost,
    handleRemoveProduct,
    isRemovingProduct
  } = useTableStock();

  const isEmpty =
    !isLoading && productList?.items && productList.items.length === 0;

  const [isOpenRemoveModal, handleChangeRemoveModal] = useProductContext(
    useShallow(state => [
      state.isOpenRemoveModal,
      state.handleChangeRemoveModal
    ])
  );

  function isExpirationNear(expirationDate: string) {
    const currentDate = new Date();
    const expiration = new Date(expirationDate);
    const timeDifference = expiration.getTime() - currentDate.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    return daysDifference <= 7 && daysDifference >= 0;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead className='w-[20%]'>Código de barras</TableHead>
          <TableHead className='w-[20%]'>Descrição</TableHead>
          <TableHead>Localização</TableHead>
          <TableHead>Quantidade</TableHead>
          <TableHead>Mínimo</TableHead>
          <TableHead>Data de validade</TableHead>
          <TableHead className='flex items-center gap-2'>
            <p>Custo</p>
            <div
              className='cursor-pointer'
              onClick={() => handleChangeShowCost(showCost ? false : true)}
            >
              {showCost ? (
                <EyeOff className='size-5' />
              ) : (
                <Eye className='size-5' />
              )}
            </div>
          </TableHead>
          <TableHead className='w-[20px]'>Tipo</TableHead>
          <TableHead className='w-[20px]'>Status</TableHead>
          <TableHead className='text-center'>-</TableHead>
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

        {productList?.items &&
          productList?.items.length > 0 &&
          productList.items.map(product => (
            <Fragment key={`${product.id}-${product.name}`}>
              <TableRow>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.barcode || '—'}</TableCell>
                <TableCell
                  className='truncate max-w-[100px]'
                  title={product.description || '—'}
                >
                  {product.description || '—'}
                </TableCell>
                <TableCell>{product.location || '—'}</TableCell>
                <TableCell
                  className={`${
                    product.stockQuantity <= product.minimumStock &&
                    'text-red-500 font-bold'
                  }`}
                >
                  {product.stockQuantity}
                </TableCell>
                <TableCell>{product.minimumStock}</TableCell>
                <TableCell
                  className={`${
                    isExpirationNear(product.expirationDate ?? '') &&
                    'text-red-500 font-bold'
                  }`}
                >
                  {product.expirationDate
                    ? format(new Date(product.expirationDate), 'dd/MM/yyyy', {
                        locale: ptBR
                      })
                    : 'N/A'}
                </TableCell>
                <TableCell>
                  {showCost ? `R$ ${product.costPrice ?? '-'}` : '-'}
                </TableCell>
                <TableCell>
                  <p className='capitalize'>{product.unit}</p>
                </TableCell>
                <TableCell>Status</TableCell>
                <TableCell className=''>
                  <div className='flex gap-2 items-center justify-center'>
                    <Popover>
                      <PopoverTrigger>
                        <EllipsisVertical className='cursor-pointer ' />
                      </PopoverTrigger>
                      <PopoverContent className='w-full'>
                        <div className='flex flex-col gap-3 w-[250px]'>
                          <p className='max-w-[250px] truncate'>
                            Ações para {product.name}
                          </p>
                          <Button
                            variant='destructive'
                            onClick={() => {
                              handleChangeRemoveModal({
                                open: true,
                                title: product.name,
                                idRemove: product.id ?? ''
                              });
                            }}
                          >
                            Apagar produto
                          </Button>
                          <Button className='p-0'>
                            <Link
                              to={`${routes.edit_product}/${product.id}`}
                              className='w-full h-full flex items-center justify-center'
                            >
                              Editar
                            </Link>
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </TableCell>
              </TableRow>

              <RemoveConfirmationModal
                isOpen={isOpenRemoveModal.open}
                key={`remove-${product.id}-${product.name}`}
                onConfirm={() => {
                  console.log(isOpenRemoveModal.idRemove);
                  if (isOpenRemoveModal.idRemove) {
                    handleRemoveProduct(isOpenRemoveModal.idRemove);
                  }

                  handleChangeRemoveModal({
                    open: false,
                    title: '',
                    idRemove: ''
                  });
                }}
                productTitle={isOpenRemoveModal.title}
                isLoading={isRemovingProduct}
                onCancel={() => {
                  handleChangeRemoveModal({
                    open: false,
                    title: '',
                    idRemove: ''
                  });
                }}
              />
            </Fragment>
          ))}

        {isEmpty && (
          <TableRow>
            <TableCell
              colSpan={11}
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
