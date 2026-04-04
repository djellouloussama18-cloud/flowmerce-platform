const webhookUrl = 'https://djeloul-oussama-n8n.hawiyat.org/webhook/shopify-order';

async function testShopifyWebhook() {
  console.log("Sending a fake Shopify order to your n8n server...");
  const payload = {
    shop_domain: "mystore.myshopify.com",
    id: 77778888,
    order_number: 1005,
    total_price: "4500.00",
    currency: "DZD",
    customer: {
      first_name: "Yassine",
      last_name: "Customer",
      phone: "+213600000000",
      email: "yassine@example.dz"
    },
    shipping_address: {
      address1: "Bab Ezzouar, Cite 5 Juillet",
      city: "Algiers",
      province: "Alger",
      country: "Algeria"
    },
    line_items: [
      { name: "Super Premium Product", quantity: 1, sku: "SP-001" }
    ]
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const text = await res.text();
    console.log("n8n Server Response:", res.status, text);
    console.log("Success! The order should now be in your database and on your Next.js dashboard.");
  } catch (err) {
    console.error("Error sending test:", err.message);
  }
}

testShopifyWebhook();
