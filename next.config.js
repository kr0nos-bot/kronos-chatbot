/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    experimental: {
        appDir: true
        // optimzeFonts: false,
        // outputStandalone: true
    }
}

module.exports = nextConfig
