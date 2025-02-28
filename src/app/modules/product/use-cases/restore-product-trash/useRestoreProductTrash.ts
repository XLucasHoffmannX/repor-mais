import { useMutationCache } from '@/app/cache';

import { ProductMutationKeys } from '../../keys/product.keys';
import { ProductService } from '../../service';

import { IRestoreProductTrashPayload } from '../../types/product.types';

export function useRestoreProductTrash() {
  const { mutateAsync, isPending, isError } = useMutationCache({
    mutationKey: [ProductMutationKeys['RESTORE-PRODUCT']],
    mutationFn: (payload: IRestoreProductTrashPayload) => {
      return ProductService.restoreProductTrash(payload);
    }
  });

  return {
    mutateAsync,
    isPending,
    isError
  };
}
