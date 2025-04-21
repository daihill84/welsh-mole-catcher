'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [cookieConsent, setCookieConsent] = useState<boolean>(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (consent === 'true') {
      setCookieConsent(true);
    }
  }, []);

  const handleAcceptCookies = () => {
    localStorage.setItem('cookieConsent', 'true');
    setCookieConsent(true);
  };

  if (cookieConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between items-center z-50">
      <p className="text-sm">
        We use cookies to improve your experience. By using our site, you agree to our use of cookies.
      </p>
      <button
        onClick={handleAcceptCookies}
        className="bg-green-500 text-white py-2 px-4 rounded-lg"
      >
        Accept
      </button>
    </div>
  );
}