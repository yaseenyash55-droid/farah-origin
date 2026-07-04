export function GET() {
  return new Response("google-site-verification: google67555741c7f4b6a0.html", {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
