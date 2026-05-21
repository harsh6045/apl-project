/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/fan-login",
        permanent: false,
      },
    ]
  },
}

export default nextConfig
