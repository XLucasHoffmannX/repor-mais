import { AxiosError } from 'axios';
import { toast } from 'sonner';

export function axiosErrorHandler(error: unknown) {
  const axiosErr = error as AxiosError;

  if (axiosErr?.response?.data) {
    const data = axiosErr.response.data as any;

    const message =
      typeof data.message === 'string'
        ? data.message
        : Array.isArray(data.message)
        ? data.message.join(', ')
        : 'Ocorreu um erro inesperado';

    toast.error(message);
  } else {
    console.error('Erro não esperado:', error);
    toast.error('Erro não esperado');
  }
}
