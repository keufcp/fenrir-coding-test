import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imgfp.hotp.jp',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
}

export default nextConfig
