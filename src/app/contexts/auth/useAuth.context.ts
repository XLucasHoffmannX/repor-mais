import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'sonner';
import { create } from 'zustand';

import { ITokenType, IUseAuthContext } from './useAuthContext.types';

export const useAuthContext = create<IUseAuthContext>()(set => ({
  userAuthenticated: null,
  expiresIn: null,
  company: null,

  handleSetUserAuth: (token, user) => {
    if (token) {
      const decoded: ITokenType = jwtDecode(token);

      Cookies.set('access-token', token, {
        expires: decoded.exp
      });

      if (user) {
        set({ userAuthenticated: user });
      }

      if (user?.company) {
        set({ company: user.company });
      }

      if (decoded) {
        return set({ expiresIn: decoded.exp });
      }
    }

    return;
  },

  handleChangeCompany: updatedCompany => {
    set(state => ({
      userAuthenticated: state.userAuthenticated
        ? {
            ...state.userAuthenticated,
            company: updatedCompany
          }
        : null
    }));
  },

  handleLogout: () => {
    Cookies.remove('access-token', {
      path: '/',
      domain:
        import.meta.env.ENV === 'prod'
          ? import.meta.env.COOKIE_DOMAIN
          : import.meta.env.COOKIE_LOCAL
    });

    set({ userAuthenticated: null });

    toast.info('Desconectado!');

    window.location.href = '/';
  }
}));
