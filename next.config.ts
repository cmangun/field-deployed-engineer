import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['swiper'],
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
};

export default nextConfig;
