export default function sitemap() {
  const baseUrl = "https://farah-origin.vercel.app";
  const routes = [
    "",
    "/gallery",
    "/view-collection",
    "/download",
    "/contact-us",
    "/reviews",
    "/login",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
