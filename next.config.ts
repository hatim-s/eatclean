import type { NextConfig } from "next";
import { homedir } from "node:os";

const nextConfig: NextConfig = {
  cacheComponents: true,
  turbopack: {
    root: homedir(),
  },
  serverExternalPackages: ["better-auth", "@libsql/client", "drizzle-orm"],
};

export default nextConfig;
