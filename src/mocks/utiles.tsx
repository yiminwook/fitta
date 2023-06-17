import QueryProvider from '@/components/layout/QueryProvider';
import RootLayout from '@/components/layout/RootLayout';
import { InitialEntry } from '@remix-run/router';
import { ReactNode } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { MemoryRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

interface ProvidersProps {
  children: ReactNode;
  initialEntries: InitialEntry[];
}

export const Providers = ({ children, initialEntries }: ProvidersProps) => {
  return (
    <HelmetProvider>
      <QueryProvider>
        <MemoryRouter initialEntries={initialEntries}>
          <RootLayout>{children}</RootLayout>
          <ToastContainer position="top-right" autoClose={700} limit={3} />
        </MemoryRouter>
      </QueryProvider>
    </HelmetProvider>
  );
};
