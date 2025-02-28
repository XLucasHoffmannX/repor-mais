import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';

import { Router } from '@/app/router/Router';
import { ThemeProvider } from '@/shared/styles/theme-provider';

export function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 0,
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 2 // 5 minutos
      }
    }
  });

  return (
    <ThemeProvider
      defaultTheme='light'
      storageKey='repormais-theme'
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools
          initialIsOpen={false}
          position='bottom'
        />

        <Router />

        <Toaster
          richColors
          position='top-right'
        />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
