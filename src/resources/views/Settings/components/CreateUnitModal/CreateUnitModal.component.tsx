import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Input
} from '@/resources/components/ui';

import { useCreateUnitModal } from './useCreateUnitModal';

import { ICreateUnitModalProps } from './CreateUnitModal.types';

export function CreateUnitModal({
  modalOpened,
  onChangeSetModalOpened
}: ICreateUnitModalProps) {
  const { methods, control, errors, handleSubmit, isPendingMutate } =
    useCreateUnitModal({ modalOpened, onChangeSetModalOpened });

  return (
    <Dialog
      open={modalOpened}
      onOpenChange={isOpen => {
        onChangeSetModalOpened(true);
        if (!isOpen) onChangeSetModalOpened(false);
      }}
    >
      <DialogTrigger asChild>
        <Button
          className='h-[40px]'
          onClick={() => onChangeSetModalOpened(true)}
        >
          Adicionar nova unidade +
        </Button>
      </DialogTrigger>

      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Criar nova unidade de estoque</DialogTitle>
          <DialogDescription>
            Organize seu estoque por unidades para melhor controle
          </DialogDescription>
        </DialogHeader>

        <Form {...methods}>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col gap-5'
          >
            <div className='flex flex-col gap-2 mt-4'>
              <FormField
                control={control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor='name'>Nome da unidade:</FormLabel>

                    <FormControl>
                      <Input
                        {...field}
                        min={1}
                        className='h-[45px] rounded'
                        errorMessage={errors.name?.message}
                        onChange={field.onChange}
                        placeholder='Insira o nome da sua unidade...'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type='submit'
                className='h-[40px]'
                isLoading={isPendingMutate}
              >
                Criar unidade
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
