import { useQueryCache } from '@/app/cache';

import { ProductQueryKeys } from '../../keys/product.keys';
import { ProductService } from '../../service';

import { IUseGetProductListPayload } from '../../types/product.types';

export function useGetProductsList(payload: IUseGetProductListPayload) {
  const { data, isFetching } = useQueryCache({
    queryKey: [ProductQueryKeys['GET-PRODUCT-LIST'], payload],
    queryFn: async () => await ProductService.getProductsList(payload),
    enabled: payload.enabled
  });

  return {
    productList: data,
    isFetching
  };
}
