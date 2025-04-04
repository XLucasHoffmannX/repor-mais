import { useEffect, useState } from 'react';

import { useUnityContext } from '@/app/contexts';
import { useGetAllUnits } from '@/app/modules/unity/uses-cases';
import { useDebounce } from '@/shared/hooks';

export function useUnitSettings() {
  const { filters, handleChangeFilter } = useUnityContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpened, setModalOpened] = useState(false);

  /* search unit product */
  const debounceSearcName = useDebounce(searchTerm);

  const { units, isLoadingUnits } = useGetAllUnits({
    enabled: true,
    search: filters.search || ''
  });

  useEffect(() => {
    handleChangeFilter({
      search: debounceSearcName ? debounceSearcName : ''
    });
  }, [debounceSearcName, handleChangeFilter]);

  return {
    units,
    isLoadingUnits,
    onChangeSetSearchTerm: setSearchTerm,
    modalOpened,
    onChangeSetModalOpened: setModalOpened
  };
}
