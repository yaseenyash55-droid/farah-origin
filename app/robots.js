export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://farah-origin.vercel.app/sitemap.xml",
  };
}
