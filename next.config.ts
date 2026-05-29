import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack ignores any unrelated lockfile
  // (e.g. one sitting in a parent folder like ~/Documents).
  turbopack: {
    root: __dirname,
  },
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
};

export default nextConfig;
