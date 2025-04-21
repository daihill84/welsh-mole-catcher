import './globals.css';
import './styles.css';

export const metadata = {
  title: 'Welsh Mole Catcher | Professional Mole & Pest Control in South & Mid Wales',
  description: 'Trusted, eco-friendly mole and pest control services across South and Mid Wales. Contact us for expert solutions to moles, rats, wasps, and more.',
  openGraph: {
    title: 'Welsh Mole Catcher | Professional Mole & Pest Control',
    description: 'Eco-friendly pest control services in South and Mid Wales. Expert solutions for moles, rats, wasps, and more.',
    url: 'https://daihill84.github.io/welsh-mole-catcher/',
    siteName: 'Welsh Mole Catcher',
    images: [
      {
        url: 'https://daihill84.github.io/welsh-mole-catcher/images/logo.png',
        width: 800,
        height: 800,
        alt: 'Welsh Mole Catcher Logo',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = '/welsh-mole-catcher';
  
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Preload critical images */}
        <link rel="preload" as="image" href={`${basePath}/images/logo.png`} />
        <link rel="preload" as="image" href={`${basePath}/images/area.png`} />
        <link rel="preload" as="image" href={`${basePath}/images/moleintrap.jpg`} />
        <link rel="preload" as="image" href={`${basePath}/images/rat1.jpg`} />
        <link rel="preload" as="image" href={`${basePath}/images/waspnest.jpg`} />
        <link rel="preload" as="image" href={`${basePath}/images/moles_collage.jpg`} />
        <link rel="preload" as="image" href={`${basePath}/images/farm_moles.jpg`} />
        <link rel="preload" as="image" href={`${basePath}/images/farm_son.jpg`} />
        <link rel="preload" as="image" href={`${basePath}/images/farm_john_mole.jpg`} />
        <link rel="preload" as="image" href={`${basePath}/images/facebook_logo.png`} />
        <link rel="preload" as="image" href={`${basePath}/images/Instagram_icon.png`} />
        <link rel="preload" as="image" href={`${basePath}/images/linked-in.jpg`} />
        <link rel="preload" as="image" href={`${basePath}/images/tube-icon.jpg`} />
        {/* Favicon */}
        <link rel="icon" href={`${basePath}/icons/favicon.ico`} />
        <link rel="apple-touch-icon" href={`${basePath}/icons/apple_touch_icon.png`} />
      </head>
      <body>{children}</body>
    </html>
  );
}