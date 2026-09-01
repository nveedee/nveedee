/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    // Für ein späteres CMS / Mux hier die Domain freigeben:
    remotePatterns: [
      // { protocol: 'https', hostname: 'cdn.sanity.io' },
      // { protocol: 'https', hostname: 'image.mux.com' },
    ],
  },
  // ESLint-Warnungen sollen den Build nicht blockieren.
  eslint: { ignoreDuringBuilds: true },
}

export default nextConfig
