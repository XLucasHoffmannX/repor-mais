import { create } from 'zustand';

import { IUseWithdrawContext } from './useWithdrawContext';

export const useWithdrawContext = create<IUseWithdrawContext>()(set => ({
  modalProps: {
    context: 'remove',
    open: false
  },

  filters: {
    search: null
  },

  filtersPagination: {
    page: 1,
    limit: 10,
    search: null,
    type: null
  },

  handleChangeModal: value => {
    set({ modalProps: { open: value.open, context: value.context } });
  },

  handleChangeFilter: ({ search }) => {
    set(state => ({
      filters: {
        ...state.filters,
        ...(typeof search !== null && { search })
      }
    }));
  },

  handleChangeFilterPagination: ({ page, limit, search, type }) => {
    set(state => ({
      filtersPagination: {
        ...state.filtersPagination,
        ...(typeof search !== null && { search }),
        ...(typeof type !== null && { type }),
        ...(page && { page }),
        ...(limit && { limit })
      }
    }));
  }
}));
