import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { useSession } from '@/app/modules/auth/use-cases';
import { NoticeQueryKeys } from '@/app/modules/notice/keys/notice.keys';
import {
  useGetGenerateAndAllNotices,
  useResolveAllNotices,
  useResolveNoticeById
} from '@/app/modules/notice/use-cases';
import { INotice } from '@/shared/types';

export function useNotice() {
  const { companyId } = useSession();
  const queryClient = useQueryClient();

  const { noticesList, isFetchingNoticesList, setQueryNotices } =
    useGetGenerateAndAllNotices({
      enabled: !!companyId
    });

  const { mutateAsync, isPending } = useResolveNoticeById();

  async function handRemoveNotice(id: string) {
    try {
      await mutateAsync({ id });

      setQueryNotices((prevNotices: INotice[]) =>
        prevNotices.filter(notice => notice.id !== id)
      );

      toast.info(`Aviso removido!`);
    } catch (error) {
      console.error(error);
      toast.error('Não foi possível remover o aviso no momento!');
    }
  }

  const { mutateAsync: mutateAsyncResolveAll, isPending: isPendingResolveAll } =
    useResolveAllNotices();

  async function handleRemoveAllNotices() {
    try {
      await mutateAsyncResolveAll({});

      setQueryNotices(() => []);

      toast.info(`Avisos removidos!`);
    } catch (error) {
      console.error(error);
      toast.error('Não foi possível remover os avisos no momento!');
    }
  }

  function handleReloadDataTable() {
    queryClient.resetQueries({
      queryKey: [NoticeQueryKeys['GET-AND-GENERATE-NOTICES']]
    });
  }

  return {
    noticesList,
    isLoading: isPending || isFetchingNoticesList || isPendingResolveAll,
    handRemoveNotice,
    handleRemoveAllNotices,
    handleReloadDataTable
  };
}
