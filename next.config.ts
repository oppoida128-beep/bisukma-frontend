import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.antaranews.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.kompas.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.detik.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.tribunnews.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.tempo.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.liputan6.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.bisukma.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tabloidpolmaspoldasu.id',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
