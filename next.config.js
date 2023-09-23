/** @type {import('next').NextConfig} */
const { i18n } = require('./next-i18next.config');

module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  i18n,
  env: {
    apiUrl: 'https://api.milicity.eu',
    localApiUrl: 'http://localhost:5003' ,
  },
};

