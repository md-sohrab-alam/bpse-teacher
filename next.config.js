const withNextIntl = require('next-intl/plugin')('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
  },
  env: {
    _next_intl_trailing_slash: 'false'
  }
};

module.exports = withNextIntl(nextConfig);
