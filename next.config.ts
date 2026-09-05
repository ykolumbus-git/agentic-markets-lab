import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/").at(-1);
const isGitHubPagesBuild = process.env.GITHUB_ACTIONS === "true";
const isAccountSite = repositoryName?.endsWith(".github.io") ?? false;
const basePath =
  isGitHubPagesBuild && repositoryName && !isAccountSite
    ? `/${repositoryName}`
    : "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
