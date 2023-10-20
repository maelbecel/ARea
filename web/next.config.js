const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      'imgur.com',
      'i.imgur.com',
      'upload.wikimedia.org'
  ]},
}

module.exports = nextConfig;
