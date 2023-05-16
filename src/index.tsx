import 'pretendard/dist/web/variable/pretendardvariable.css';
import '@/styles/Global.scss';
import ReactDOM from 'react-dom/client';
import App from '@/pages/App';
import RootLayout from '@/components/layout/RootLayout';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60, //1분
      // cacheTime: 1000 * 60 * 10,
      retry: 3,
      retryDelay: 1000 * 30,
      refetchInterval: 1000 * 30,
    },
  },
});

root.render(
  <>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RootLayout>
            <App />
          </RootLayout>
        </BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  </>,
);
