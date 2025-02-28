import { create } from 'zustand';

import { IUsProductContext } from './useProductContext.types';

export const useProductContext = create<IUsProductContext>()(set => ({
  filters: {
    page: 1,
    limit: 10,
    search: null,
    unit: null,
    barcode: null
  },

  isOpenRemoveModal: {
    open: false,
    title: '',
    idRemove: ''
  },

  handleChangeRemoveModal: value => {
    set({
      isOpenRemoveModal: {
        open: value.open,
        title: value.title,
        idRemove: value.idRemove
      }
    });
  },

  handleChangeFilter: ({ page, limit, search, barcode, unit }) => {
    set(state => ({
      filters: {
        ...state.filters,
        ...(typeof search !== null && { search }),
        ...(typeof barcode !== null && { barcode }),
        ...(typeof unit !== null && { unit }),
        ...(page && { page }),
        ...(limit && { limit })
      }
    }));
  }
}));
