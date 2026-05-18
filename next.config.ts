import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Plasmic Studio loads your host page in an iframe while you build.
        source: "/plasmic-host",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors https://studio.plasmic.app",
          },
          {
            key: "X-Frame-Options",
            value: "ALLOWALL",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
