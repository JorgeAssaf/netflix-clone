/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['upload.wikimedia.org', 'uhdtv.io', 'mango.blender.org', 'download.blender.org', 'lh3.googleusercontent.com'],
  },

}

module.exports = nextConfig
