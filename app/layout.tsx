import './globals.css';
import './styles.css';
import Script from 'next/script';
import CookieConsent from './components/CookieConsent';

export const metadata = {
  title: 'Welsh Mole Catcher | Professional Mole & Pest Control in South & Mid Wales',
  description: 'Trusted, eco-friendly mole and pest control services across South and Mid Wales. Contact us for expert solutions to moles, rats, wasps, and more.',
  openGraph: {
    title: 'Welsh Mole Catcher | Professional Mole & Pest Control',
    description: 'Eco-friendly pest control services in South and Mid Wales. Expert solutions for moles, rats, wasps, and more.',
    url: 'https://www.welshmolecatcher.co.uk/',
    siteName: 'Welsh Mole Catcher',
    images: [
      {
        url: 'https://www.welshmolecatcher.co.uk/images/logo.png',
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
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W4MV2C9C');
          `}
        </Script>
        {/* End Google Tag Manager */}
        {/* Favicon */}
        <link rel="icon" href="/icons/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple_touch_icon.png" />
        {/* Preload critical images */}
        <link rel="preload" as="image" href="/images/logo.png" />
        <link rel="preload" as="image" href="/images/moles_collage.jpg" />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W4MV2C9C"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}