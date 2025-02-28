import { useQueryClient } from '@tanstack/react-query';

import { useQueryCache } from '@/app/cache';
import { INotice } from '@/shared/types';

import { NoticQueryKeys } from '../../keys/notice.keys';
import { NoticeService } from '../../service';

import { IUseGetGenerateAndAllNoticesPayload } from '../../types/notice.types';

export function useGetGenerateAndAllNotices(
  payload: IUseGetGenerateAndAllNoticesPayload
) {
  const queryClient = useQueryClient();

  const { data, isFetching } = useQueryCache({
    queryKey: [NoticQueryKeys['GET-AND-GENERATE-NOTICES']],
    queryFn: async () => await NoticeService.getGenerateAndAllNotices(),
    enabled: payload.enabled
  });

  function setQueryNotices(
    updater: INotice[] | ((prevNotices: INotice[]) => INotice[])
  ) {
    queryClient.setQueryData(
      [NoticQueryKeys['GET-AND-GENERATE-NOTICES']],
      (oldData: INotice[] | undefined) => {
        if (typeof updater === 'function') {
          return updater(oldData || []);
        }
        return updater;
      }
    );
  }

  return {
    noticesList: data,
    isFetchingNoticesList: isFetching,
    setQueryNotices
  };
}
