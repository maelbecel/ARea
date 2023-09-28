const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['imgur.com'], // Add 'imgur.com' to the list of allowed domains
  },
};

module.exports = nextConfig;
