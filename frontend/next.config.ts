import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use standalone for Render, but Vercel handles this automatically
  output: process.env.VERCEL ? undefined : "standalone",
  images: {
    domains: [],
  },
  trailingSlash: false,
  reactStrictMode: true,
};

export default nextConfig;
