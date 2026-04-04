const webhookUrl = 'https://djeloul-oussama-n8n.hawiyat.org/webhook/merchant/config';

async function testConfigWebhook() {
  console.log("Sending config to n8n...");
  const payload = {
    user_id: "e751e3b7-49b9-4205-9a18-1ee989936c3b", // odjemake@gmail.com
    shop_domain: "mystore.myshopify.com",
    shopify_token: "shpat_12345",
    delivery_company: "Yalidine",
    delivery_api_key: "api_key_test",
    delivery_endpoint: "https://api.yalidine.com/v1",
    whatsapp_token: "wa_token_test",
    whatsapp_phone_number_id: "wa_phones_id",
    notification_email: "test@example.com"
  };

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const text = await res.text();
    console.log("Response:", res.status, text);
  } catch (err) {
    console.error("Error:", err.message);
  }
}

testConfigWebhook();
