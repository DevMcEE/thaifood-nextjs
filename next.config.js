/** @type {import('next').NextConfig} */
import { i18n }from './next-i18next.config.js';

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  i18n,
}

export default nextConfig;