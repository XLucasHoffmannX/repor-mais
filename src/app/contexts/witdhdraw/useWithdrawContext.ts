import { IWithdraw } from '@/shared/types';

type ModalPropsType = {
  context: 'remove' | 'entry';
  open: boolean;
};

type FilterWithdrawType = {
  search: string | null;
};

type FilterPaginationWithdrawType = {
  page: number;
  limit: number;
  search: string | null;
  type: IWithdraw['type'] | null;
};

export interface IUseWithdrawContext {
  filters: FilterWithdrawType;
  filtersPagination: FilterPaginationWithdrawType;
  modalProps: ModalPropsType;
  handleChangeModal: (value: ModalPropsType) => void;
  handleChangeFilter: (filter: Partial<FilterWithdrawType>) => void;
  handleChangeFilterPagination: (
    filter: Partial<FilterPaginationWithdrawType>
  ) => void;
}
