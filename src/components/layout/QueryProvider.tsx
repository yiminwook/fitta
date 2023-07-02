import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchIntervalInBackground: true,
      refetchOnMount: false,
      refetchOnReconnect: true,
      // refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 10, //10분
      cacheTime: 1000 * 60 * 10,
      retry: 3,
      retryDelay: 1000 * 30,
      refetchInterval: 1000 * 60 * 10,
      suspense: true,
      // useErrorBoundary: false,
    },
  },
});

const QueryProvider = ({ children }: PropsWithChildren) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
