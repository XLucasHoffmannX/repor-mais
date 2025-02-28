import Cookies from 'js-cookie';
import { useShallow } from 'zustand/react/shallow';

import { useAuthContext } from '@/app/contexts/auth/useAuth.context';

export function useSession() {
  const token = Cookies.get('access-token') as string;

  const [userAuthenticated, handleLogout] = useAuthContext(
    useShallow(state => [state.userAuthenticated, state.handleLogout])
  );

  return {
    authenticated: !!token,
    companyId: userAuthenticated?.company?.id,
    company: userAuthenticated?.company,
    userAuthenticated,
    handleLogout,
    isManager: userAuthenticated?.role === 'OWNER_USER'
  };
}
