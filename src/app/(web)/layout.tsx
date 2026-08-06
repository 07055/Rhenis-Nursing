import Navbar from '@/app/(web)/includes/navbar';
import Footer from '@/app/(web)/includes/footer';
import type { Metadata } from 'next';
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import ScrollToTopButton from '@/components/common/ScrollToTopButton';
import { APP_NAME } from '@/lib/config/config';
import '@/styles/web/rhenis.css';

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  display: 'swap',
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: '--font-ibm-plex-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: `${APP_NAME} Systems`,
  icons: {
    icon: '/logo/logo.png',
    shortcut: '/logo/logo.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${fraunces.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable} rhenis-web flex min-h-screen flex-col`}
    >
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
