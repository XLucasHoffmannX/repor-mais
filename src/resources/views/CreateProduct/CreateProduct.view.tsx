import { useNavigate } from 'react-router-dom';

import { useUnityContext } from '@/app/contexts';
import { routes } from '@/app/router/router.constant';
import { Loader } from '@/resources/components/base';
import { AppLayout } from '@/resources/components/layouts/AppLayout/AppLayout.layout';
import {
  Button,
  DatePicker,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea
} from '@/resources/components/ui';

import { useCreateProduct } from './useCreateProduct';

import { ICreateProductProps } from './CreateProduct.types';

export function CreateProductView({ context }: ICreateProductProps) {
  const { unity } = useUnityContext();

  const { methods, handleSubmit, errors, control, isLoading } =
    useCreateProduct({ context });

  const navigate = useNavigate();

  return (
    <AppLayout
      breadcrumbs={[
        { name: 'Produtos', url: routes.app },
        { name: 'Meus Produtos' }
      ]}
    >
      <Loader
        isLoading={isLoading}
        message={'Adicionando produto...'}
      />

      <section className='w-full flex justify-center'>
        <div className='w-full max-w-[800px]'>
          <div className='flex flex-col'>
            <div className='flex flex-col gap-3'>
              <h1 className='font-bold text-3xl'>
                {context === 'create' ? 'Adicionar Produto' : 'Editar Produto'}
              </h1>
              <span className='font-light mb-4'>
                <b className='font-medium'>{unity?.name}</b>
              </span>
            </div>
            <div className='mt-6'>
              <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-3'
              >
                <Form {...methods}>
                  <div className='flex gap-5 items-center'>
                    <FormField
                      control={control}
                      name='name'
                      render={({ field }) => (
                        <FormItem className='w-full'>
                          <FormLabel className='text-base'>
                            Nome do Produto *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className='h-[50px] rounded'
                              errorMessage={errors.name?.message}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name='barcode'
                      render={({ field }) => (
                        <FormItem className='w-[300px]'>
                          <FormLabel className='text-base'>
                            Código de Barras
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className='h-[50px] rounded'
                              errorMessage={errors.barcode?.message}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='flex gap-5 items-center'>
                    <DatePicker
                      control={control}
                      name='expirationDate'
                      displayName='Data de validade'
                    />

                    <FormField
                      control={control}
                      name='brand'
                      render={({ field }) => (
                        <FormItem className='w-full'>
                          <FormLabel className='text-base'>
                            Marca do produto
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className='h-[50px] rounded'
                              errorMessage={errors.brand?.message}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={control}
                    name='description'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className='text-base'>Descrição</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            className='h-[60px] rounded'
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className='flex gap-5 items-center'>
                    <FormField
                      control={control}
                      name='location'
                      render={({ field }) => (
                        <FormItem className='w-full'>
                          <FormLabel className='text-base'>
                            Localização
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className='h-[50px] rounded uppercase'
                              errorMessage={errors.location?.message}
                              value={field.value ?? ''}
                              onChange={e =>
                                field.onChange(e.target.value.toUpperCase())
                              }
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name='costPrice'
                      render={({ field }) => (
                        <FormItem className='w-full'>
                          <FormLabel className='text-base'>
                            Preço de Custo
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className='h-[50px] rounded'
                              errorMessage={errors.costPrice?.message}
                              type='text'
                              value={field.value ?? ''}
                              onChange={e => {
                                const value = e.target.value.replace(
                                  /[^0-9.]/g,
                                  ''
                                );
                                field.onChange(
                                  value === '' ? null : Number(value)
                                );
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='flex gap-5 items-center'>
                    <FormField
                      control={control}
                      name='stockQuantity'
                      render={({ field }) => (
                        <FormItem className='w-full'>
                          <FormLabel className='text-base'>
                            Quantidade em Estoque *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className='h-[50px] rounded'
                              errorMessage={errors.stockQuantity?.message}
                              type='text'
                              value={field.value ?? ''}
                              onChange={e => {
                                const value = e.target.value.replace(
                                  /[^0-9]/g,
                                  ''
                                );
                                field.onChange(
                                  value === '' ? null : Number(value)
                                );
                              }}
                              disabled={context === 'edit'}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name='minimumStock'
                      render={({ field }) => (
                        <FormItem className='w-full'>
                          <FormLabel className='text-base'>
                            Estoque Mínimo *
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className='h-[50px] rounded'
                              errorMessage={errors.minimumStock?.message}
                              type='text'
                              value={field.value ?? ''}
                              onChange={e => {
                                const value = e.target.value.replace(
                                  /[^0-9]/g,
                                  ''
                                );
                                field.onChange(
                                  value === '' ? null : Number(value)
                                );
                              }}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={control}
                    name='unit'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel className='text-base'>Unidade *</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value ?? ''}
                            onValueChange={value => field.onChange(value)}
                          >
                            <SelectTrigger className='h-[50px] rounded'>
                              <SelectValue placeholder='Selecione a unidade' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value='unidade'>Unidade</SelectItem>
                                <SelectItem value='caixa'>Caixa</SelectItem>
                                <SelectItem value='kg'>Kilograma</SelectItem>
                                <SelectItem value='litro'>Litro</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <div className='flex flex-row-reverse mt-12'>
                    <Button
                      className='hover:scale-105 h-[50px] transition-all duration-300 flex items-center justify-center gap-[8px] px-[24px] transform active:scale-90 hover:opacity-[80%] md:w-[300px] w-full text-white'
                      type='submit'
                    >
                      Salvar produto
                    </Button>

                    {context === 'edit' && (
                      <Button
                        className='mr-4 hover:scale-105 h-[50px] transition-all duration-300 flex items-center justify-center gap-[8px] px-[24px] transform active:scale-90 hover:opacity-[80%] md:w-[300px] w-full '
                        type='button'
                        variant={'outline'}
                        onClick={() => navigate(routes.app)}
                      >
                        Cancelar
                      </Button>
                    )}
                  </div>
                </Form>
              </form>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
