import { useMutationCache } from '@/app/cache';

import { ProductMutationKeys } from '../../keys/product.keys';
import { ProductService } from '../../service';

import { IRemoveProductPayload } from '../../types/product.types';

export function useRemoveProduct() {
  const { mutateAsync, isPending, isError } = useMutationCache({
    mutationKey: [ProductMutationKeys['REMOVE-PRODUCT']],
    mutationFn: (payload: IRemoveProductPayload) => {
      return ProductService.removeProduct(payload);
    }
  });

  return {
    mutateRemoveProduct: mutateAsync,
    isPending: isPending,
    isError
  };
}
