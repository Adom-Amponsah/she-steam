/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',  // Enable static exports
  images: {
    unoptimized: true, // Required for static export
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // ✅ Add this to disable the red "N" dev badge
  devIndicators: {
    buildActivity: false,
  },
};

export default nextConfig;
