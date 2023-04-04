/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  webpack: (config, context) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
  compiler: {
    emotion: true,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/:path*",
  //       destination: "http://localhost:8080/:path*",
  //     },
  //   ];
  // },
  // TODO : 도메인 수정
  images: {
    domains: ["kdt-ai6-team06.elicecoding.com"],
    formats: ["image/avif", "image/webp"],
  },
  env: {
    API_URL: "http://kdt-ai6-team06.elicecoding.com",
  },
};

module.exports = nextConfig;
