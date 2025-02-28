import { useMutationCache } from '@/app/cache';

import { NoticeMutationKeys } from '../../keys/notice.keys';
import { NoticeService } from '../../service';

export function useResolveAllNotices() {
  const { mutateAsync, isPending, isError } = useMutationCache({
    mutationKey: [NoticeMutationKeys['RESOLVE-ALL-NOTICES']],
    mutationFn: () => {
      return NoticeService.resolveAllNotices();
    }
  });

  return {
    mutateAsync,
    isPending,
    isError
  };
}
