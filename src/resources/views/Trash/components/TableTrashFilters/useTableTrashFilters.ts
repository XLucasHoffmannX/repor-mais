import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useTrashContext } from '@/app/contexts';
import { ProductQueryKeys } from '@/app/modules/product/keys/product.keys';
import { useDebounce } from '@/shared/hooks';

export function useTableTrashFilters() {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');

  const handleChangeFilter = useTrashContext(state => state.handleChangeFilter);

  /* search name product */
  const debounceSearcName = useDebounce(searchTerm);

  useEffect(() => {
    handleChangeFilter({
      search: debounceSearcName ? debounceSearcName : ''
    });
  }, [debounceSearcName, handleChangeFilter]);

  function handleReloadDataTable() {
    queryClient.resetQueries({
      queryKey: [ProductQueryKeys['GET-PRODUCT-LIST']]
    });

    queryClient.resetQueries({
      queryKey: [ProductQueryKeys['GET-PRODUCT-BY-ID']]
    });

    queryClient.resetQueries({
      queryKey: [ProductQueryKeys['GET-PRODUCTS-TRASH']]
    });
  }

  return {
    handleReloadDataTable,
    onChangeSetSearchTerm: setSearchTerm
  };
}
