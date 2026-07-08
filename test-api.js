async function test() {
  const res = await fetch("https://farah-origin.vercel.app/api/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Test", email: "farahorigin.shop@gmail.com" })
  });
  const data = await res.json();
  console.log(data);
}
test();
