import { useMutationCache } from '@/app/cache';

import { ProductMutationKeys } from '../../keys/product.keys';
import { ProductService } from '../../service';

import { ICreateProductPayload } from '../../types/product.types';

export function useAddProductMutation() {
  const { mutateAsync, isPending, isError } = useMutationCache({
    mutationKey: [ProductMutationKeys['CREATE-PRODUCT']],
    mutationFn: (data: ICreateProductPayload) => {
      return ProductService.addProduct(data);
    }
  });

  return {
    mutateAddProduct: mutateAsync,
    isPendingMutate: isPending,
    isError
  };
}
