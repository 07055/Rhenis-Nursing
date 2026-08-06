// This is the root layout
import './globals.css';
import { Outfit } from 'next/font/google';
import type { Metadata } from 'next';
import { LeftSidebarProvider } from '@/lib/contexts/panel/layout/includes/sidebar/LeftSidebarContext';
import { RightSidebarProvider } from '@/lib/contexts/panel/layout/includes/sidebar/RightSidebarContext';
import { ThemeProvider } from '@/lib/contexts/panel/layout/theme/PanelThemeContext';
import { APP_NAME } from '@/lib/config/config';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: APP_NAME,
  description: `${APP_NAME} Systems`,
  icons: {
    icon: '/logo/logo.png',
    shortcut: '/logo/logo.png',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${outfit.className} bg-white text-black dark:bg-gray-900 dark:text-white transition-colors duration-300`}
      >
        <ThemeProvider>
          <LeftSidebarProvider>
            <RightSidebarProvider>
              {children}
            </RightSidebarProvider>
          </LeftSidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
