import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label
} from '@/resources/components/ui';

export function CreateUnitModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='h-[40px]'>Adicionar nova unidade +</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Criar nova unidade de estoque</DialogTitle>
          <DialogDescription>
            Organize seu estoque por unidades para melhor controle
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-2 mt-4'>
          <Label htmlFor='name'>Nome da unidade</Label>
          <Input
            id='name'
            value='Pedro Duarte'
            className='col-span-3'
          />
        </div>
        <DialogFooter>
          <Button
            type='submit'
            className='h-[40px]'
          >
            Criar unidade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
