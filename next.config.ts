import type { NextConfig } from "next";

const IS_DEV = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  cacheComponents: true,
  serverExternalPackages: ["better-auth", "@libsql/client", "drizzle-orm"],
  /* config options here */
  experimental: {
    turbopackUseSystemTlsCerts: IS_DEV,
  }
};

export default nextConfig;
