import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useProductContext } from '@/app/contexts';
import { useSession } from '@/app/modules/auth/use-cases';
import { ProductQueryKeys } from '@/app/modules/product/keys/product.keys';
import {
  useGetProductsList,
  useRemoveProduct
} from '@/app/modules/product/use-cases';

export function useTableStock() {
  const { companyId } = useSession();
  const queryClient = useQueryClient();

  const [showCost, setShowCost] = useState(false);

  const filters = useProductContext(state => state.filters);

  const { productList, isFetching } = useGetProductsList({
    page: filters.page,
    limit: filters.limit,
    search: filters.search ? filters.search : filters.barcode ? '' : '',
    barcode: filters.barcode ? filters.barcode : filters.search ? '' : '',
    unit: filters.unit === 'none' ? undefined : filters.unit || undefined,
    enabled: !!companyId
  });

  const { mutateRemoveProduct, isPending } = useRemoveProduct();

  async function handleRemoveProduct(id: string) {
    try {
      await mutateRemoveProduct({ id: id });

      queryClient.resetQueries({
        queryKey: [ProductQueryKeys['GET-PRODUCT-BY-ID']]
      });

      queryClient.resetQueries({
        queryKey: [ProductQueryKeys['GET-PRODUCT-LIST']]
      });

      queryClient.resetQueries({
        queryKey: [ProductQueryKeys['GET-PRODUCTS-TRASH']]
      });

      toast.info(`Produto removido!`);
    } catch (error) {
      console.error(error);

      toast.error('Não foi possível remover o produto!');
    }
  }

  return {
    productList,
    isLoading: isFetching,
    showCost,
    handleChangeShowCost: setShowCost,
    handleRemoveProduct,
    isRemovingProduct: isPending
  };
}
