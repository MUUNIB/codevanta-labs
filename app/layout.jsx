import '@fontsource/chakra-petch/500.css';
import '@fontsource/chakra-petch/600.css';
import '@fontsource/chakra-petch/700.css';
import '@fontsource-variable/sora';
import './globals.css';
import { site } from '@/lib/site';

export const metadata = {
  title: 'CodeVanta Labs | Software, AI & Digital Growth',
  description: site.description,
  openGraph: {
    title: 'CodeVanta Labs',
    description: 'We engineer modern software, AI solutions and digital growth engines.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#f6f8fc',
  colorScheme: 'light',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
