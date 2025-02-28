import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';

import { useProductContext } from '@/app/contexts';
import { ProductQueryKeys } from '@/app/modules/product/keys/product.keys';
import { useGetAllUnits } from '@/app/modules/unity/uses-cases';
import { useDebounce } from '@/shared/hooks';

export function useTableFilter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [barcodeSearch, setBarcodeSearch] = useState('');
  const queryClient = useQueryClient();

  const { units, isLoadingUnits } = useGetAllUnits({ enabled: true });

  /* serach name product */
  const debounceSearcName = useDebounce(searchTerm);

  /* barcode */
  const debounceSearchBarcode = useDebounce(barcodeSearch);

  const { handleChangeFilter } = useProductContext();

  useEffect(() => {
    handleChangeFilter({
      search: debounceSearcName ? debounceSearcName : '',
      barcode: debounceSearcName ? '' : debounceSearchBarcode
    });
  }, [debounceSearcName, debounceSearchBarcode, handleChangeFilter]);

  function handleReloadDataTable() {
    queryClient.resetQueries({
      queryKey: [ProductQueryKeys['GET-PRODUCT-LIST']]
    });
  }

  return {
    onChangeSetSearchTerm: setSearchTerm,
    onChangeBarcodeSearchTerm: setBarcodeSearch,
    units,
    isLoadingUnits,
    handleReloadDataTable
  };
}
