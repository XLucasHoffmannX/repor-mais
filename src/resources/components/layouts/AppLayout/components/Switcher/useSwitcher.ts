import { useEffect } from 'react';

import { useShallow } from 'zustand/react/shallow';

import { useUnityContext } from '@/app/contexts';
import { useGetAllUnits } from '@/app/modules/unity/uses-cases';

export function useSwitcher() {
  const { units, isLoadingUnits } = useGetAllUnits({ enabled: true });
  const [unity, handleSetUnity] = useUnityContext(
    useShallow(state => [state.unity, state.handleSetUnity])
  );

  useEffect(() => {
    if (units && units.length > 0 && !unity) {
      handleSetUnity(units[0]);
    }
  }, [units, unity]);

  return {
    units,
    isLoadingUnits
  };
}
