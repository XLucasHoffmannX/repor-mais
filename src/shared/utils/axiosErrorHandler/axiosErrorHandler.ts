import { AxiosError } from 'axios';
import { toast } from 'sonner';

export function axiosErrorHandler(error: unknown) {
  if (!(error instanceof AxiosError)) {
    console.error('Erro não esperado:', error);
    toast.error('Erro não esperado');
    return;
  }

  console.log(error);

  const message = error.response?.data?.message || 'Ocorreu um erro inesperado';
  toast.error(message);
}
