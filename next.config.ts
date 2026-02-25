import type { NextConfig } from "next";

const IS_DEV = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    turbopackUseSystemTlsCerts: IS_DEV,
  }
};

export default nextConfig;
