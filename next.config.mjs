/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: false,
    domains: [
      "firebasestorage.googleapis.com",
      "storage.googleapis.com",
      "evecollections.vercel.app",
      "images.unsplash.com",
    ],
  },
};

export default nextConfig;
