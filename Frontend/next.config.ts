import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    return [
      {
        source: "/req/:path*",
        destination: "https://library-management-system-client-wkjs.onrender.com/req/:path*", 
      },
    ];
  },
};

export default nextConfig;
