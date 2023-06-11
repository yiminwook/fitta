import { createRoot, hydrateRoot } from 'react-dom/client';
import App from '@/pages/App';
import RootLayout from '@/components/layout/RootLayout';
import 'pretendard/dist/web/variable/pretendardvariable.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/Toast.scss';
import '@/styles/Global.scss';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

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
      useErrorBoundary: true,
    },
  },
});

if (process.env.NODE_ENV === 'production') {
  console.log('SETUP MODE', process.env.NODE_ENV);
  axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
  axios.defaults.withCredentials = true;
}

const app = (
  <>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <RootLayout>
            <App />
          </RootLayout>
          <ToastContainer position="top-right" autoClose={700} limit={3} />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </HelmetProvider>
  </>
);

const root = document.getElementById('root') as HTMLElement;

if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
