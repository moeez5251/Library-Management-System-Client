import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    return [
      {
        source: "/req/:path*",
        destination: "http://127.0.0.1:8000/req/:path*", 
      },
    ];
  },
};

export default nextConfig;
