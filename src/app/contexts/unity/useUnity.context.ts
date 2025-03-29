import { create } from 'zustand';

import { IUseUnityContext } from './useUnityContext.types';

export const useUnityContext = create<IUseUnityContext>()((set, get) => ({
  filters: {
    search: null
  },
  unity: undefined,

  handleChangeFilter: ({ search }) => {
    set(state => ({
      filters: {
        ...state.filters,
        ...(typeof search !== null && { search })
      }
    }));
  },

  handleSetUnity: unity => {
    if (unity === get().unity) {
      return;
    }

    set({ unity: unity });
  }
}));
