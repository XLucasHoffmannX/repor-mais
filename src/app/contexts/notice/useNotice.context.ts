import { create } from 'zustand';

import { IUseNoticeContext } from './useNoticeContext.types';

export const useNoticeContext = create<IUseNoticeContext>()(set => ({
  modalProps: {
    open: false
  },

  handleChangeModal: value => {
    set({ modalProps: { open: value.open } });
  }
}));
