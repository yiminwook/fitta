import { PropsWithChildren, useState } from 'react';
import layout from '@/components/layout/Layout.module.scss';
import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/Footer';

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className={layout['main']}>{children}</main>
      <Footer />
    </>
  );
};

export default RootLayout;
