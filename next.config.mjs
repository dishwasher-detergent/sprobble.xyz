/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { webpack }) => {
    config.plugins.push(new webpack.IgnorePlugin({
      checkResource: resource => {
        return /\/functions\//.test(resource);
      },
    }));
    return config;
  },
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
      }
    ],
  },
};

export default nextConfig;

