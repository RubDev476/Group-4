/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
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
