import type { Metadata, Viewport } from 'next';
import { Sora, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { SurveyModalProvider } from '@/context/SurveyModalContext';
import SurveyModal from '@/components/SurveyModal';
import UtmCapture from '@/components/UtmCapture';

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Jibsolar — Rooftop Solar for Indian Homes & Businesses',
  description: 'We size the system, file the paperwork, put panels on the roof, and stay on call after — so switching to solar doesn\'t turn into a second job for you.',
  openGraph: {
    title: 'Jibsolar — Rooftop Solar for Indian Homes & Businesses',
    description: 'We size the system, file the paperwork, put panels on the roof, and stay on call after.',
    siteName: 'Jibsolar',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        <UtmCapture />
        <SurveyModalProvider>
          {children}
          <SurveyModal />
        </SurveyModalProvider>
      </body>
    </html>
  );
}
