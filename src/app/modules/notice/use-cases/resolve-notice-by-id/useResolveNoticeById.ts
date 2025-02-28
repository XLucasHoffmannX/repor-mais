import { useMutationCache } from '@/app/cache';

import { NoticeMutationKeys } from '../../keys/notice.keys';
import { NoticeService } from '../../service';

import { IResolveNoticeByIdPayload } from '../../types/notice.types';

export function useResolveNoticeById() {
  const { mutateAsync, isPending, isError } = useMutationCache({
    mutationKey: [NoticeMutationKeys['RESOLVE-NOTICE-BY-ID']],
    mutationFn: (payload: IResolveNoticeByIdPayload) => {
      return NoticeService.resolveNoticeById(payload);
    }
  });

  return {
    mutateAsync,
    isPending,
    isError
  };
}
