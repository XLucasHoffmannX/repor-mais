import { useWithdrawContext } from '@/app/contexts';
import { useSession } from '@/app/modules/auth/use-cases';
import { useGetAllWithdraws } from '@/app/modules/withdraw/use-cases';

export function useTableHistory() {
  const { companyId } = useSession();

  const filtersPagination = useWithdrawContext(
    state => state.filtersPagination
  );

  const { withdrawList, isFetching } = useGetAllWithdraws({
    page: filtersPagination.page,
    limit: filtersPagination.limit,
    type: filtersPagination.type || undefined,
    search: filtersPagination.search || '',
    enabled: !!companyId
  });

  return {
    withdrawList,
    isLoading: isFetching
  };
}
