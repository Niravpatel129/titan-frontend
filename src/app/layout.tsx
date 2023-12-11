'use client';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextUIProvider } from '@nextui-org/react';
import Navbar from '@/components/Navbar/Navbar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <NextUIProvider>
          <Navbar />
          <div className='px-20 py-8'>{children}</div>
        </NextUIProvider>
      </body>
    </html>
  );
}
