import React from 'react';
import Header from '@/components/layouts/header';
import Footer from '@/components/layouts/footer';

const layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default layout;
