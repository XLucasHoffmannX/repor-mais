import { useQueryCache } from '@/app/cache';

import { ProductQueryKeys } from '../../keys/product.keys';
import { ProductService } from '../../service';

import { IUseGetProductByIdPayload } from '../../types/product.types';

export function useGetProductById(payload: IUseGetProductByIdPayload) {
  const { data, isFetching } = useQueryCache({
    queryKey: [ProductQueryKeys['GET-PRODUCT-BY-ID'], payload],
    queryFn: async () => await ProductService.getProductById(payload),
    enabled: payload.enabled
  });

  return {
    productReturned: data,
    isFetchingProductReturned: isFetching
  };
}
