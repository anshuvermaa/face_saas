/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'devx.octrends.com',
        port: '8000',
      },
    ],
  },
}

module.exports = nextConfig
