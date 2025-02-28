import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useWithdrawContext } from '@/app/contexts';
import { WithdrawQueryKeys } from '@/app/modules/withdraw/keys/withdraw.keys';
import { useDebounce } from '@/shared/hooks';
import { IWithdraw } from '@/shared/types';

export function useTableHistoryFilters() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<IWithdraw['type'] | null>(null);

  const queryClient = useQueryClient();

  /* search name product */
  const debounceSearcName = useDebounce(searchTerm);

  const handleChangeFilterPagination = useWithdrawContext(
    state => state.handleChangeFilterPagination
  );

  useEffect(() => {
    handleChangeFilterPagination({
      search: debounceSearcName ? debounceSearcName : '',
      type: typeFilter
    });
  }, [debounceSearcName, handleChangeFilterPagination, typeFilter]);

  function handleReloadDataTable() {
    queryClient.resetQueries({
      queryKey: [WithdrawQueryKeys['GET_ALL_WITHDRAWS']]
    });
  }

  function onChangeSetTypeFilter(value: string) {
    setTypeFilter(value === 'all' ? null : (value as IWithdraw['type']));
  }

  return {
    handleReloadDataTable,
    onChangeSetSearchTerm: setSearchTerm,
    onChangeSetTypeFilter
  };
}
