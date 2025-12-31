import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, 
  },
  typescript: {
    ignoreBuildErrors: true, 
  },
  async rewrites() {
    return [
      {
        source: "/req/:path*",
        destination: "https://library-management-system-client-1.onrender.com/req/:path*",
      },
    ];
  },
};

export default nextConfig;
