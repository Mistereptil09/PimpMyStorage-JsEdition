import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { // used to redirect from a link to another
        source: '/old-path',
        destination: '/welcome',
        permanent: true, // This indicates a 308 permanent redirect
      },
      {
        source: '/temporary-path',
        destination: '/another-path',
        permanent: false, // This indicates a 307 temporary redirect
      },
    ];
  },
  // other config options here
};

export default nextConfig;