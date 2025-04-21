# setup-newsite.ps1
# Automates the setup, configuration, and deployment of a Next.js static site to GitHub Pages with a custom domain

# Step 1: Set up variables
$projectDir = "F:\newsite"
$repoUrl = "https://github.com/daihill84/welsh-mole-catcher.git"
$customDomain = "www.welshmolecatcher.co.uk"

# Step 2: Navigate to project directory or create it
if (-Not (Test-Path $projectDir)) {
    Write-Host "Creating project directory at $projectDir"
    New-Item -ItemType Directory -Path $projectDir | Out-Null
}
Set-Location $projectDir
Write-Host "Working in directory: $projectDir"

# Step 3: Initialize Git repository if not already initialized
if (-Not (Test-Path "$projectDir\.git")) {
    Write-Host "Initializing Git repository"
    git init
    git remote add origin $repoUrl
} else {
    Write-Host "Git repository already initialized"
    # Ensure the remote is correct
    git remote set-url origin $repoUrl
}

# Step 4: Create or update package.json
Write-Host "Creating/updating package.json"
$packageJson = @"
{
  "name": "newsite",
  "version": "0.1.0",
  "private": true,
  "description": "Welsh Mole Catcher - Professional Mole & Pest Control in South & Mid Wales",
  "author": "Dai Hill",
  "license": "MIT",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "deploy": "git push origin main"
  },
  "dependencies": {
    "next": "^14.2.28",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-icons": "^4.12.0",
    "tailwindcss": "^2.2.19",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47"
  },
  "devDependencies": {
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0"
  }
}
"@
Set-Content -Path "package.json" -Value $packageJson

# Step 5: Install dependencies
Write-Host "Installing dependencies"
npm install

# Step 6: Resolve security vulnerabilities
Write-Host "Resolving security vulnerabilities"
npm audit fix

# Step 7: Create next.config.js (no basePath since using custom domain at root)
Write-Host "Creating next.config.js"
$nextConfig = @"
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
"@
Set-Content -Path "next.config.js" -Value $nextConfig

# Step 8: Create tailwind.config.js
Write-Host "Creating tailwind.config.js"
$tailwindConfig = @"
module.exports = {
  purge: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
"@
Set-Content -Path "tailwind.config.js" -Value $tailwindConfig

# Step 9: Create postcss.config.js
Write-Host "Creating postcss.config.js"
$postcssConfig = @"
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
"@
Set-Content -Path "postcss.config.js" -Value $postcssConfig

# Step 10: Create app/styles.css (with TailwindCSS fixes)
Write-Host "Creating app/styles.css"
if (-Not (Test-Path "app")) {
    New-Item -ItemType Directory -Path "app" | Out-Null
}
$stylesCss = @"
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  color: #333;
  background-color: #f5f5f5;
}

/* Navigation */
.nav-container {
  @apply bg-gray-800 p-4 sticky top-0 z-50 shadow-lg;
}

.nav-content {
  @apply max-w-6xl mx-auto flex justify-between items-center px-4;
}

.nav-logo {
  @apply text-green-400 text-xl font-bold flex items-center;
}

.nav-menu-button {
  @apply text-green-400 bg-transparent border-none text-2xl cursor-pointer sm:hidden;
}

.nav-menu {
  @apply list-none flex gap-6;
}

.nav-menu.open {
  @apply flex flex-col absolute top-16 left-0 w-full bg-gray-800 p-4;
}

.nav-item {
  @apply my-2 sm:my-0;
}

.nav-link {
  @apply text-green-400 text-lg font-semibold transition-colors duration-300 hover:text-white;
}

/* Hero Section */
.hero-section {
  @apply relative h-screen bg-cover bg-center flex items-center justify-center text-center text-white;
  background-image: url('/images/moles_collage.jpg');
}

.hero-overlay {
  @apply absolute inset-0 bg-black bg-opacity-70;
}

.hero-content {
  @apply relative z-10;
}

.hero-logo {
  @apply mb-4;
}

.hero-title {
  @apply text-4xl md:text-5xl font-bold mb-4;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
}

.hero-subtitle {
  @apply text-lg md:text-xl mb-6;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-button {
  @apply bg-green-500 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300 hover:bg-green-600;
}

/* About Section */
.about-section {
  @apply py-16 bg-white;
}

.section-container {
  @apply max-w-6xl mx-auto px-4;
}

.about-content {
  @apply flex flex-wrap gap-8 items-center;
}

.section-title {
  @apply text-3xl font-bold mb-8 text-gray-800 text-center;
}

.about-text {
  @apply flex-1;
  min-width: 300px;
}

.about-text p {
  @apply mb-4 leading-relaxed;
}

.about-image-container {
  @apply flex-1;
  min-width: 300px;
  text-align: center;
}

.about-image {
  @apply max-w-full h-auto rounded-lg shadow-md;
}

/* Why Choose Us Section */
.why-choose-us-section {
  @apply py-16 bg-gray-100;
}

.why-choose-us-content {
  @apply max-w-6xl mx-auto px-4;
}

.why-choose-us-content > div {
  @apply flex flex-col gap-6;
}

.why-choose-us-item {
  @apply flex items-center gap-4 bg-white p-6 rounded-lg shadow-md;
}

.why-choose-us-icon {
  @apply text-green-500 text-3xl;
}

.why-choose-us-title {
  @apply text-xl font-semibold mb-2 text-gray-800;
}

.why-choose-us-text {
  @apply leading-relaxed;
}

/* Services Section */
.services-section {
  @apply py-16 bg-white;
}

.services-grid {
  @apply grid grid-cols-1 md:grid-cols-2 gap-8;
}

.service-card {
  @apply bg-gray-100 p-6 rounded-lg text-center shadow-md;
}

.service-icon {
  @apply text-green-500 text-4xl mb-4;
}

.service-title {
  @apply text-xl font-semibold mb-4 text-gray-800;
}

.service-image-grid {
  @apply flex justify-center gap-4 mb-4;
}

.service-image {
  @apply max-w-full h-auto rounded-lg;
}

.service-text {
  @apply leading-relaxed;
}

/* Testimonials Section */
.testimonials-section {
  @apply py-16 bg-gray-100;
}

.testimonial-item {
  @apply bg-white p-6 rounded-lg mb-6 shadow-md;
}

.testimonial-text {
  @apply italic leading-relaxed mb-4;
}

.testimonial-author {
  @apply font-semibold text-green-500;
}

/* Gallery Section */
.gallery-section {
  @apply py-16 bg-white;
}

.gallery-grid {
  @apply grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4;
}

.gallery-item {
  @apply relative;
}

.gallery-image {
  @apply w-full h-auto rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105;
}

.modal {
  @apply fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50;
}

.modal img {
  max-width: 90%;
  max-height: 90%;
  @apply rounded-lg;
}

/* Contact Section */
.contact-section {
  @apply py-16 bg-gray-100;
}

.contact-form-container {
  @apply max-w-lg mx-auto px-4;
}

.contact-form {
  @apply flex flex-col gap-6;
}

.form-label {
  @apply text-lg font-semibold text-gray-800;
}

.form-input,
.form-textarea {
  @apply w-full p-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-green-500;
}

.form-textarea {
  @apply h-40 resize-none;
}

.form-button {
  @apply bg-green-500 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300 hover:bg-green-600;
}

/* FAQs Section */
.faqs-section {
  @apply py-16 bg-white;
}

.faq-item {
  @apply mb-6;
}

.faq-question {
  @apply text-xl font-semibold text-gray-800 mb-2;
}

.faq-answer {
  @apply leading-relaxed;
}

/* Live Chat */
.chat-container {
  @apply fixed bottom-6 right-6 z-50;
}

.chat-button {
  @apply bg-green-500 text-white py-3 px-6 rounded-full flex items-center gap-2 shadow-lg transition-colors duration-300 hover:bg-green-600;
}

.chat-window {
  @apply bg-white w-80 h-96 rounded-lg shadow-xl flex flex-col;
}

.chat-header {
  @apply bg-green-500 text-white p-4 rounded-t-lg flex justify-between items-center;
}

.chat-messages {
  @apply flex-1 p-4 overflow-y-auto;
}

.chat-messages p {
  @apply mb-2;
}

.chat-form {
  @apply flex p-4 border-t;
}

.chat-input {
  @apply flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500;
}

.chat-submit {
  @apply bg-green-500 text-white px-4 rounded-r-lg hover:bg-green-600;
}

/* Footer Section */
.footer {
  @apply bg-gray-800 text-white py-12;
}

.footer-content {
  @apply max-w-6xl mx-auto px-4 flex flex-wrap gap-8;
}

.footer-section {
  @apply flex-1;
  min-width: 200px;
}

.footer-title {
  @apply text-xl font-semibold mb-4;
}

.footer-text {
  @apply leading-relaxed;
}

.footer-links {
  @apply list-none;
}

.footer-links li {
  @apply mb-2;
}

.footer-link {
  @apply text-green-400 transition-colors duration-300 hover:text-white;
}

.footer-contact {
  @apply flex items-center gap-2 mb-2;
}

.footer-social {
  @apply flex gap-4 mt-4;
}

.footer-social img {
  @apply w-6 h-6;
}

.footer-copyright {
  @apply text-center mt-8 text-sm;
}

/* Responsive Design */
@media (max-width: 640px) {
  .nav-menu {
    @apply hidden;
  }

  .nav-menu.open {
    @apply flex;
  }

  .hero-title {
    @apply text-3xl;
  }

  .hero-subtitle {
    @apply text-base;
  }

  .about-content {
    @apply flex-col;
  }

  .why-choose-us-item {
    @apply flex-col text-center;
  }

  .service-image-grid {
    @apply flex-col;
  }

  .gallery-grid {
    @apply grid-cols-1;
  }

  .footer-content {
    @apply flex-col;
  }
}
"@
Set-Content -Path "app/styles.css" -Value $stylesCss

# Step 11: Create app/components/CookieConsent.tsx
Write-Host "Creating app/components/CookieConsent.tsx"
if (-Not (Test-Path "app/components")) {
    New-Item -ItemType Directory -Path "app/components" | Out-Null
}
$cookieConsent = @"
'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          We use cookies to improve your experience. By continuing to use this site, you accept our use of cookies.
          <a href="/privacy-policy" className="underline ml-1">Learn more</a>.
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleAccept}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
"@
Set-Content -Path "app/components/CookieConsent.tsx" -Value $cookieConsent

# Step 12: Create app/layout.tsx (with updated metadata for custom domain)
Write-Host "Creating app/layout.tsx"
$layoutTsx = @"
import './styles.css';
import CookieConsent from './components/CookieConsent';

export const metadata = {
  title: 'Welsh Mole Catcher - Professional Mole & Pest Control',
  description: 'Professional mole and pest control services in South & Mid Wales. Contact us for expert solutions!',
  openGraph: {
    title: 'Welsh Mole Catcher - Professional Mole & Pest Control',
    description: 'Professional mole and pest control services in South & Mid Wales. Contact us for expert solutions!',
    url: 'https://$customDomain/',
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
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
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
"@
Set-Content -Path "app/layout.tsx" -Value $layoutTsx

# Step 13: Create app/page.tsx (minimal homepage)
Write-Host "Creating app/page.tsx"
$pageTsx = @"
export default function Home() {
  return (
    <div>
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Welsh Mole Catcher</h1>
          <p className="hero-subtitle">Professional Mole & Pest Control in South & Mid Wales</p>
          <a href="#contact" className="hero-button">Get in Touch</a>
        </div>
      </section>
      {/* Add more sections as needed */}
    </div>
  );
}
"@
Set-Content -Path "app/page.tsx" -Value $pageTsx

# Step 14: Create GitHub Actions workflow for deployment (with custom domain)
Write-Host "Creating GitHub Actions workflow"
if (-Not (Test-Path ".github/workflows")) {
    New-Item -ItemType Directory -Path ".github/workflows" | Out-Null
}
$deployYml = @"
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install Dependencies
        run: npm install

      - name: Build with Next.js
        run: npm run build

      - name: Create .nojekyll
        run: touch ./out/.nojekyll

      - name: Add Custom Domain
        run: echo '$customDomain' > ./out/CNAME

      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: 'https://$customDomain'
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
"@
Set-Content -Path ".github/workflows/deploy.yml" -Value $deployYml

# Step 15: Remove tsconfig.json (since you're not using TypeScript)
Write-Host "Removing tsconfig.json (not using TypeScript)"
if (Test-Path "tsconfig.json") {
    Remove-Item "tsconfig.json"
}

# Step 16: Build the site
Write-Host "Building the site"
Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force "out" -ErrorAction SilentlyContinue
npm run build

# Step 17: Commit and push changes
Write-Host "Committing and pushing changes to GitHub"
git add .
git commit -m "Complete setup and deployment configuration for GitHub Pages with custom domain"
npm run deploy

# Step 18: Final instructions
Write-Host "Setup complete!"
Write-Host "Your site should be deploying to https://$customDomain/"
Write-Host "Next steps:"
Write-Host "1. Configure your custom domain in GitHub Pages settings:"
Write-Host "   - Go to https://github.com/daihill84/welsh-mole-catcher/settings/pages"
Write-Host "   - Under 'Custom domain', enter '$customDomain' and save."
Write-Host "   - Check 'Enforce HTTPS' if available."
Write-Host "2. Configure DNS settings for your domain:"
Write-Host "   - Add a CNAME record: 'www' -> 'daihill84.github.io.'"
Write-Host "   - If you want to use the apex domain (welshmolecatcher.co.uk), add A records pointing to GitHub Pages IPs:"
Write-Host "     185.199.108.153"
Write-Host "     185.199.109.153"
Write-Host "     185.199.110.153"
Write-Host "     185.199.111.153"
Write-Host "   - Optionally, add an ALIAS or ANAME record for the apex domain to 'daihill84.github.io.'"
Write-Host "3. Check the GitHub Actions logs in your repository for deployment status."
Write-Host "If there are issues, verify your GitHub Pages settings, DNS configuration, and workflow logs."