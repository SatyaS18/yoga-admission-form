/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BACKEND_URL: "https://yoga-admission-form-6k1b.onrender.com",
  },
  images: {
    domains: ["yoga-admission-form-6k1b.onrender.com"], // Allow external backend images if needed
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://yoga-admission-form-6k1b.onrender.com/api/:path*", // Proxy API calls to Render backend
      },
    ];
  },
};

export default nextConfig;
