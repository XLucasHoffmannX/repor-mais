import Cookies from 'js-cookie';
import { useShallow } from 'zustand/react/shallow';

import { useUnityContext } from '@/app/contexts';
import { useAuthContext } from '@/app/contexts/auth/useAuth.context';

export function useSession() {
  const token = Cookies.get('access-token') as string;

  const [userAuthenticated, handleLogout] = useAuthContext(
    useShallow(state => [state.userAuthenticated, state.handleLogout])
  );

  const [unity, handleSetUnity] = useUnityContext(
    useShallow(state => [state.unity, state.handleSetUnity])
  );

  return {
    authenticated: !!token,
    companyId: userAuthenticated?.company?.id,
    company: userAuthenticated?.company,
    userAuthenticated,
    handleLogout,
    unity,
    handleSetUnity,
    isManager: userAuthenticated?.role === 'OWNER_USER'
  };
}
