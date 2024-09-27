/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "ctqraexyoivdkvybyppb.supabase.co",
                port: "",
                pathname: "**",
            },
            {
                protocol: "https",
                hostname: "rtqxvxxtdnjrfljmkxfb.supabase.co",
                port: "",
                pathname: "**",
            },
        ],
    },
}

export default nextConfig
