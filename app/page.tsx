import ClientHome from './ClientHome';

// Define metadata using generateMetadata (server-side)
export async function generateMetadata() {
  return {
    title: 'Welsh Mole Catcher | Pukka Pest Control with Visual Flair',
    description:
      'Expert mole catching and pest control in Wales with a visually stunning twist. Family-run service for farms and rural homes using traditional methods. Call 07375 303124!',
    keywords: 'mole catching Wales, pest control farm, Welsh mole catcher, rural pest services, traditional mole traps',
    authors: [{ name: 'Welsh Mole Catcher' }],
    icons: {
      icon: '/icons/favicon.ico',
      apple: '/icons/apple_touch_icon.png',
    },
  };
}

export default function Page() {
  return <ClientHome />;
}