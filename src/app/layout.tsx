import type {Metadata} from 'next';
import './globals.css';
import { SiteHeader } from '@/components/site-header';
import { SiteFooter } from '@/components/site-footer';
import { FloatingContact } from '@/components/floating-contact';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Bisukma Digital | Transformasi Digital Terpercaya',
  description: 'Solusi digital inovatif untuk bisnis masa kini. Layanan software, konsultasi IT, dan transformasi digital terbaik.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <FloatingContact />
        <Toaster />
      </body>
    </html>
  );
}
