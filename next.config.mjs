/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co", // ImageBB domain
        pathname: "/**",
      },
      // Add any other domains you'll use
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
