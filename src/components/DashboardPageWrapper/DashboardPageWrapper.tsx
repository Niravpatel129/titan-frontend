import Head from 'next/head';
import React from 'react';

export default function DashboardPageWrapper({ children }) {
  return (
    <>
      <title>Titan | Dashboard</title>
      <Head>
        <link rel='icon' type='image/x-icon' href='./favicon.ico' />
      </Head>

      {children}
    </>
  );
}
