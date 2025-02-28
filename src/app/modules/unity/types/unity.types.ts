import { IUnity } from '@/shared/types';

/* getAllUnits */

export interface IUseGetAllUnitsProps {
  enabled?: boolean;
}

export interface IUseGetAllUnits {
  units: IUnity[] | undefined;
  isLoadingUnits: boolean;
}
