import { Inter as FontSans } from 'next/font/google';
import './globals.css';
import { cn } from '../lib/utils';
import { Toaster } from '../components/ui/toaster';

export const metadata = {
  title: 'Intelligent File Upload',
  description: 'By Jatin Kathuria',
};

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

// eslint-disable-next-line react/prop-types
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={cn(
          'bg-background min-h-screen font-sans antialiased',
          fontSans.variable,
        )}
      >
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
