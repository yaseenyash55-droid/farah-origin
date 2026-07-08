async function test() {
  const res = await fetch("https://farah-origin.vercel.app/api/auth/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contact: "farahorigin.shop@gmail.com", method: "email" })
  });
  const data = await res.json();
  console.log(data);
}
test();
