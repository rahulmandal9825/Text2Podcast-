/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript:{
        ignoreBuildErrors:true
    },
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"lovely-flamingo-139.convex.cloud"
            },
        ]
    }
};

export default nextConfig;
