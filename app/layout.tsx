import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Welsh Mole Catcher | Professional Pest Control in Wales',
  description:
    'Family-run mole catching and pest control services in South and Mid Wales. Eco-friendly and effective solutions for farms and homes.',
  keywords: 'mole catching Wales, pest control farm, Welsh mole catcher, rural pest services, traditional mole traps',
  authors: [{ name: 'Welsh Mole Catcher' }],
  icons: {
    icon: '/icons/favicon.ico',
    apple: '/icons/apple_touch_icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}