/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Tells Next.js to generate static HTML/CSS/JS
  basePath: '/farah-origin', // Matches your GitHub repository name
  images: {
    unoptimized: true, // Required for static export images to work
  },
};

export default nextConfig;