'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextUIProvider } from '@nextui-org/react';
import Navbar from '@/components/Navbar/Navbar';
import Head from 'next/head';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <Head>
        <title>Titan</title>
        <meta property='og:title' content='Titan' key='title' />
      </Head>
      <body className={inter.className}>
        <NextUIProvider>
          <Navbar />
          <div className='px-2 sm:px-20 py-8'>{children}</div>
        </NextUIProvider>
      </body>
    </html>
  );
}
