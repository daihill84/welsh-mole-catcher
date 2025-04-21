/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/welsh-mole-catcher',
  assetPrefix: '/welsh-mole-catcher/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;