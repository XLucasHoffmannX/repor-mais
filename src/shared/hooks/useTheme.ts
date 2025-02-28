import { useContext } from 'react';

import {
  ThemeProviderContext,
  ThemeProviderStateType
} from '@/shared/styles/theme-provider';

export function useTheme(): ThemeProviderStateType {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
}
