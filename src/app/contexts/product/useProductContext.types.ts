type FilterProductType = {
  page: number;
  limit: number;
  search: string | null;
  unit: string | null;
  barcode: string | null;
};

type OpenModalType = {
  title: string;
  open: boolean;
  idRemove: string;
};

export interface IUsProductContext {
  filters: FilterProductType;
  isOpenRemoveModal: OpenModalType;
  handleChangeRemoveModal: (value: OpenModalType) => void;
  handleChangeFilter: (pagination: Partial<FilterProductType>) => void;
}
