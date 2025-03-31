import { IUnity } from '@/shared/types';

type FilterUnitType = {
  search: string | null;
};

export interface IUseUnityContext {
  filters: FilterUnitType;
  unity: IUnity | undefined;
  handleChangeFilter: (filters: Partial<FilterUnitType>) => void;
  handleSetUnity: (unity: IUnity) => void;
}
