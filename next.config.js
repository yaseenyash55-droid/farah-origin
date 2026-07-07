/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.BUILD_APK === 'true' ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;