import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Logo from '@/app/fotos_do site/Starion_Logo2.png'
import './globals.css';
import { Home } from '@/components/home'

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Starion',
  description: 'Escolha seu personagem e comece o quiz!',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
