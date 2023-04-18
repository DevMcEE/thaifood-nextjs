/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  i18n: {
    locales: ['en', 'et', 'ru', 'th'],
    defaultLocale: 'en',
    
  }
}

module.exports = nextConfig
