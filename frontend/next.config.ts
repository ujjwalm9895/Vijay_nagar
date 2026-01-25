import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    domains: [],
  },
  // For Render deployment
  trailingSlash: false,
  reactStrictMode: true,
};

export default nextConfig;
