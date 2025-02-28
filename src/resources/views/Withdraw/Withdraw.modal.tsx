import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { useWithdrawContext } from '@/app/contexts';
import { useSession } from '@/app/modules/auth/use-cases';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  ComboBox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Textarea
} from '@/resources/components/ui';

import { useWithdraw } from './useWithdraw';

import { IWithdrawModalProps } from './WithdrawModal.types';

export function WithdrawModal({ isOpen }: IWithdrawModalProps) {
  const { modalProps, handleChangeModal, handleChangeFilter, filters } =
    useWithdrawContext();
  const { userAuthenticated } = useSession();

  const {
    methods,
    control,
    errors,
    handleSubmit,
    handleChangeSelectItem,
    productListByUnitFormatted,
    errorCombo,
    handleChageErrorCombo,
    selectedProduct,
    isFetching,
    isPendingMutate
  } = useWithdraw();

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className='sm:max-w-md w-[95%] rounded-lg'>
        <AlertDialogHeader>
          <AlertDialogTitle className='mb-4'>
            {modalProps.context === 'entry' ? 'Entrada' : 'Retirada'}
          </AlertDialogTitle>
        </AlertDialogHeader>

        <Form {...methods}>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-3'
          >
            <AlertDialogDescription>
              Selecione um produto e a quantidade para{' '}
              {modalProps.context === 'entry'
                ? 'adicionar ao estoque.'
                : 'remover do estoque.'}
            </AlertDialogDescription>

            <FormItem>
              <FormLabel>Responsável</FormLabel>
              <FormControl>
                <Input
                  className='h-[50px] rounded'
                  value={userAuthenticated?.name ?? ''}
                  disabled
                />
              </FormControl>
            </FormItem>

            <FormField
              control={control}
              name='quantity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantidade *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      min={1}
                      className='h-[50px] rounded'
                      errorMessage={errors.quantity?.message}
                      onChange={e => {
                        const value = e.target.value.replace(/[^0-9.]/g, '');
                        field.onChange(value === '' ? null : Number(value));
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name='reason'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivo</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className='h-[60px] rounded'
                      placeholder='Não obrigatório'
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name='productId'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel className={`${errorCombo && 'text-red-500'}`}>
                    Produto *
                  </FormLabel>
                  <FormControl>
                    <ComboBox
                      options={productListByUnitFormatted ?? []}
                      selectedValue={field.value}
                      searchTerm={filters.search ?? ''}
                      onChange={value => {
                        field.onChange(value);
                        handleChangeSelectItem(value);
                        handleChageErrorCombo('');
                      }}
                      onSearch={value => handleChangeFilter({ search: value })}
                      placeholder='Selecione um produto...'
                      searchPlaceholder='Buscar produto...'
                      width='w-[400px]'
                      isLoading={isFetching}
                      isError={!!errorCombo}
                    />
                  </FormControl>
                  <FormMessage>
                    {errorCombo && 'Selecione um produto!'}
                  </FormMessage>
                </FormItem>
              )}
            />
            {selectedProduct && (
              <div className='mt-3'>
                <div className='flex items-center gap-2'>
                  <p>
                    Disponível: <b>{selectedProduct.stockQuantity}</b>
                  </p>
                  <p>
                    Estoque minimo: <b>{selectedProduct.minimumStock}</b>
                  </p>
                </div>

                {selectedProduct.expirationDate && (
                  <p className='mt-2'>
                    Validade:{' '}
                    <b>
                      {selectedProduct.expirationDate
                        ? format(
                            new Date(selectedProduct.expirationDate),
                            'dd/MM/yyyy',
                            {
                              locale: ptBR
                            }
                          )
                        : 'N/A'}
                    </b>
                  </p>
                )}
              </div>
            )}

            <AlertDialogFooter className='mt-16'>
              <Button
                variant='outline'
                type='button'
                size='lg'
                onClick={() => {
                  handleChangeModal({ context: 'remove', open: false });
                  window.history.replaceState(
                    null,
                    '',
                    window.location.pathname
                  );
                }}
              >
                Cancelar
              </Button>
              <Button
                type='submit'
                size='lg'
                isLoading={isPendingMutate}
              >
                Confirmar
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
