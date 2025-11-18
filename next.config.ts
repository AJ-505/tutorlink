/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import type { NextConfig } from "next";
import "./src/env.js";

const withBundleAnaylzer = (await import("@next/bundle-analyzer")).default({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  cacheComponents: true,
  reactCompiler: true,

  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

export default withBundleAnaylzer(nextConfig);
