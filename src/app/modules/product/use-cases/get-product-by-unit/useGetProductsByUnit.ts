import { useQueryCache } from '@/app/cache';

import { ProductQueryKeys } from '../../keys/product.keys';
import { ProductService } from '../../service';

import { IUseGetProductByUnitPayload } from '../../types/product.types';

export function useGetProductsByUnit({
  unitId,
  enabled,
  search
}: IUseGetProductByUnitPayload) {
  const { data, isFetching } = useQueryCache({
    queryKey: [ProductQueryKeys['GET-PRODUCTS-UNIT'], { unitId, search }],
    queryFn: async () =>
      await ProductService.getProductByUnit({ unitId, search }),
    enabled: enabled
  });

  const productListByUnitFormatted = data?.map(product => ({
    value: product.id ?? '',
    label: product.name
  }));

  return {
    productListByUnit: data,
    productListByUnitFormatted,
    isFetching
  };
}
