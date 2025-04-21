/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: '/welsh-mole-catcher', // Replace 'newsite' with your repository name
};

module.exports = nextConfig;