const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/projects/:path*",
        destination: "/Projects/:path*",
        permanent: true,
      },
      {
        source: "/dsa",
        destination: "/DSA",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

