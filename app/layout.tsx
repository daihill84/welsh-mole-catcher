import './styles.css';
import CookieConsent from './components/CookieConsent';

export const metadata = {
  title: 'Welsh Mole Catcher - Professional Mole & Pest Control',
  description: 'Professional mole and pest control services in South & Mid Wales. Contact us for expert solutions!',
  openGraph: {
    title: 'Welsh Mole Catcher - Professional Mole & Pest Control',
    description: 'Professional mole and pest control services in South & Mid Wales. Contact us for expert solutions!',
    url: 'https://www.welshmolecatcher.co.uk/',
    siteName: 'Welsh Mole Catcher',
    images: [
      {
        url: '/images/moles_collage.jpg',
        width: 800,
        height: 600,
        alt: 'Mole catching services',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: 
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            ,
          }}
        />
      </head>
      <body>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
