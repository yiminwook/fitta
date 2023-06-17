import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // refetchIntervalInBackground: false,
      // refetchOnMount: false,
      // refetchOnReconnect: false,
      // refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 10, //10분
      cacheTime: 1000 * 60 * 10,
      retry: 3,
      retryDelay: 1000 * 30,
      refetchInterval: 1000 * 30,
      suspense: true,
      // useErrorBoundary: false,
    },
  },
});

const QueryProvider = (props: any) => {
  return <QueryClientProvider client={queryClient} {...props} />;
};

export default QueryProvider;
