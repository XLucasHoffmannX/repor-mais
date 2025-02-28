import { create } from 'zustand';

import { IUseTrashContext } from './useTrashContex.types';

export const useTrashContext = create<IUseTrashContext>()(set => ({
  filters: {
    search: null
  },

  handleChangeFilter: ({ search }) => {
    set(state => ({
      filters: {
        ...state.filters,
        ...(typeof search !== null && { search })
      }
    }));
  }
}));
