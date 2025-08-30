import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    domains: ["example.com", "images.unsplash.com"],
  },
};

export default nextConfig;
