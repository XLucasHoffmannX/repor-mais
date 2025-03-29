import { IUnity } from '@/shared/types';

/* getAllUnits */

export interface IGetAllUnitsPayload {
  search?: string;
}

export interface IUseGetAllUnitsProps extends IGetAllUnitsPayload {
  enabled?: boolean;
}

export interface IUseGetAllUnits {
  units: IUnity[] | undefined;
  isLoadingUnits: boolean;
}
