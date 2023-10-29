// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  eslint: {
    ignoreDuringBuilds: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/projects",
        permanent: false,
      },
    ];
  },
  images: {
    domains: ["github-production-user-asset-6210df.s3.amazonaws.com", "content.optimism.io"],
  },
};

module.exports = nextConfig;
