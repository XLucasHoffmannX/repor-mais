import { useQueryCache } from '@/app/cache';

import { ProductQueryKeys } from '../../keys/product.keys';
import { ProductService } from '../../service';

import { IUseGetProductTrashPayload } from '../../types/product.types';

export function useGetProductsTrash({
  enabled,
  search
}: IUseGetProductTrashPayload) {
  const { data, isFetching } = useQueryCache({
    queryKey: [ProductQueryKeys['GET-PRODUCTS-TRASH'], { search }],
    queryFn: async () => await ProductService.getProductTrash({ search }),
    enabled: enabled
  });

  return {
    productsTrash: data,
    isFetchingProductsTrash: isFetching
  };
}
