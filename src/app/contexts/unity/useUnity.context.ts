import { create } from 'zustand';

import { IUseUnityContext } from './useUnityContext.types';

export const useUnityContext = create<IUseUnityContext>()(set => ({
  unity: undefined,

  handleSetUnity: unity => {
    set({ unity: unity });
  }
}));
