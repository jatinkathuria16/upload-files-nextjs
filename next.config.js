/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'hmwv9pdqjivtem1p.public.blob.vercel-storage.com',
          port: '',
        },
      ],
    },
  };
   
  module.exports = nextConfig;