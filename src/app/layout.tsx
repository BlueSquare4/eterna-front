import type {Metadata} from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { SiteHeader } from '@/components/layout/site-header';
import { Toaster } from '@/components/ui/toaster';
import { SiteFooter } from '@/components/layout/site-footer';

export const metadata: Metadata = {
  title: 'Enhanced Axiom Pulse',
  description: "A pixel-perfect replica of Axiom Trade's token discovery table.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <div className="relative flex h-screen min-h-dvh flex-col bg-background overflow-hidden">
            <SiteHeader />
            <main className="flex-1 flex flex-col min-h-0">{children}</main>
            <SiteFooter />
            <Toaster />
        </div>
      </body>
    </html>
  );
}
