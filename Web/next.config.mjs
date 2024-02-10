/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.scdn.co",
        port: "",
      },
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "cloud.appwrite.io",
        port: "",
      },
    ],
  },
};

export default nextConfig;
