import type React from 'react';
import './globals.css';
import { Cairo } from 'next/font/google';
import { SonnerProvider } from '@/components/sonner-provaider';
import { ThemeProvider } from 'next-themes';

const cairo = Cairo({ subsets: ['arabic'] });

export const metadata = {
  title: "وقف الأب - Father's Endowment",
  description: 'تبرع لدعم مبادرات الرعاية الصحية',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={cairo.className}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <SonnerProvider />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
