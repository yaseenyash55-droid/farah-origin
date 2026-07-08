const fetch = require('node-fetch');

async function test() {
  const orderData = {
    orderNumber: "TEST-12345",
    items: [
      {
        id: "prod_1",
        name: "Test Product",
        description: "A test",
        price: 100,
        quantity: 1,
        image: "https://example.com/img.jpg"
      }
    ],
    shippingAddress: {
      name: "Test User",
      addressLine1: "123 Test St",
      city: "Test City",
      state: "TS",
      zip: "123456",
      phone: "1234567890"
    },
    paymentMethod: "cod",
    pricing: {
      subtotal: 100,
      shipping: 10,
      taxes: 18,
      total: 128
    },
    recipientEmail: "test@example.com"
  };

  try {
    const res = await fetch("https://farah-origin.vercel.app/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData)
    });
    
    const text = await res.text();
    console.log("Status:", res.status);
    console.log("Response Body:", text);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

test();
