import { IUnity } from '@/shared/types';

type FilterUnitType = {
  search: string | null;
};

type ModalUnitPropsType = {
  id?: string;
  open: boolean;
};

export interface IUseUnityContext {
  filters: FilterUnitType;
  modalUnit: ModalUnitPropsType;
  unity: IUnity | undefined;
  handleChangeFilter: (filters: Partial<FilterUnitType>) => void;
  handleSetUnity: (unity: IUnity) => void;
  handleChangeModalUnit: (modalUnit: ModalUnitPropsType) => void;
}
