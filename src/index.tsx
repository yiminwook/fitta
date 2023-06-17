import { createRoot, hydrateRoot } from 'react-dom/client';
import App from '@/pages/App';
import RootLayout from '@/components/layout/RootLayout';
import 'pretendard/dist/web/variable/pretendardvariable.css';
import 'react-toastify/dist/ReactToastify.css';
import '@/styles/Toast.scss';
import '@/styles/Global.scss';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import QueryProvider from '@/components/layout/QueryProvider';

if (process.env.NODE_ENV === 'production') {
  console.log('SETUP MODE', process.env.NODE_ENV);
  axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;
  axios.defaults.withCredentials = true;
}

export const app = (
  <HelmetProvider>
    <QueryProvider>
      <BrowserRouter>
        <RootLayout>
          <App />
        </RootLayout>
        <ToastContainer position="bottom-center" autoClose={700} limit={3} />
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryProvider>
  </HelmetProvider>
);

export const root = document.getElementById('root') as HTMLElement;

if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}

// reportWebVitals(console.log);
