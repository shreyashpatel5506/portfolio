const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: '',
                pathname: '/**', // Allow all Cloudinary paths
            },
        ],
    },
};

export default nextConfig;
