/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
        ],
    },
    sassOptions: {
        silenceDeprecations: ["legacy-js-api"],
    },
};

export default nextConfig;
