import { PropsWithChildren } from 'react';
import layout from '@/layout/Layout.module.scss';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default RootLayout;
