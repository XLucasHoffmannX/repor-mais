import { useMutationCache } from '@/app/cache';

import { ProductMutationKeys } from '../../keys/product.keys';
import { ProductService } from '../../service';

import {
  IEditProductPayload,
  IUseEditProductPayload
} from '../../types/product.types';

export function useEditProduct({ productId }: IUseEditProductPayload) {
  const { mutateAsync, isPending, isError } = useMutationCache({
    mutationKey: [ProductMutationKeys['EDIT-PRODUCT']],
    mutationFn: (data: IEditProductPayload) => {
      return ProductService.editProduct(data, productId);
    }
  });

  return {
    mutateEditProduct: mutateAsync,
    isPendingMutate: isPending,
    isError
  };
}
