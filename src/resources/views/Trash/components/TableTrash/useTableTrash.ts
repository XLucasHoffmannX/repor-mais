import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useTrashContext } from '@/app/contexts';
import { useSession } from '@/app/modules/auth/use-cases';
import { ProductQueryKeys } from '@/app/modules/product/keys/product.keys';
import {
  useGetProductsTrash,
  useRestoreProductTrash
} from '@/app/modules/product/use-cases';

export function useTableTrash() {
  const { companyId } = useSession();
  const queryClient = useQueryClient();

  const filters = useTrashContext(state => state.filters);

  const { productsTrash, isFetchingProductsTrash } = useGetProductsTrash({
    search: filters.search || '',
    enabled: !!companyId
  });

  const { mutateAsync, isPending } = useRestoreProductTrash();

  async function handleRestoreProduct(id: string) {
    try {
      await mutateAsync({ id: id });

      queryClient.resetQueries({
        queryKey: [ProductQueryKeys['GET-PRODUCT-BY-ID']]
      });

      queryClient.resetQueries({
        queryKey: [ProductQueryKeys['GET-PRODUCT-LIST']]
      });

      queryClient.resetQueries({
        queryKey: [ProductQueryKeys['GET-PRODUCTS-TRASH']]
      });

      toast.info(`Produto restaurado!`);
    } catch (error) {
      console.error(error);

      toast.error('Não foi possível restaurar o produto!');
    }
  }

  return {
    productsTrash,
    isFetchingProductsTrash,
    handleRestoreProduct,
    isPending
  };
}
