type FilterProductType = {
  search: string | null;
};

export interface IUseTrashContext {
  filters: FilterProductType;
  handleChangeFilter: (filters: Partial<FilterProductType>) => void;
}
