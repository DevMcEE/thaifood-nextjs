/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  i18n,
  env: {
    apiUrl: process.env.NODE_ENV === 'production' ? 'https://api.milicity.eu' : 'http://localhost:5003',
    localApiUrl: 'http://localhost:5003',
    cdnName: process.env.NODE_ENV === 'production' ? 'dqpl2cxxa' : 'dt7jbtkxo',
    defaultImageId: 'no_image_placeholder',
  },
};

