import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input,
  Skeleton
} from '@/resources/components/ui';

import { useCompanySettings } from './useCompanySettings';

export function CompanySettings() {
  const {
    methods,
    handleSubmit,
    control,
    errors,
    isLoading,
    isPendingMutate,
    company
  } = useCompanySettings();

  return (
    <div className='mt-8'>
      {isLoading ? (
        <>
          <Skeleton className='h-[60px] max-w-[500px]' />
        </>
      ) : (
        <form
          className='flex flex-col gap-3'
          onSubmit={handleSubmit}
        >
          <Form {...methods}>
            <div className='flex gap-5 items-center max-w-[500px]'>
              <FormField
                control={control}
                name='name'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='text-base'>Empresa:</FormLabel>
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
            </div>
            <div className='flex flex-row mt-3'>
              <Button
                className='hover:scale-105 h-[45px] transition-all duration-300 flex items-center justify-center gap-[8px] px-[24px] transform active:scale-90 hover:opacity-[80%] md:w-[150px] w-full text-white'
                type='submit'
                isLoading={isPendingMutate}
                disabled={company?.name === methods.getValues().name}
              >
                Atualizar
              </Button>
            </div>
          </Form>
        </form>
      )}
    </div>
  );
}
