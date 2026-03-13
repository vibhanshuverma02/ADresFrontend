import crypto from "crypto";
import axios from "axios";

const APP_TOKEN = "sbx:iauODXroV7oenJMoJZhbnWQu.YMErl5oWD57IiHq0jCN3WRxwrT4fuY7l"; 
const APP_SECRET = "k1zSTi4wKHmoBIxx4FxxXqTBJZkCouaR";  

async function getAccessToken() {
  const ts = Math.floor(Date.now() / 1000); // timestamp in seconds
  const method = "POST";
  const path = "/resources/accessTokens/sdk"; // API path only (no domain)

  const body = {
    userId: "vibhanshu",   // REQUIRED
    levelName: "KYC",      // your verification flow name
    ttlInSecs: 600,
    applicantIdentifiers: {
      email: "1000014498@dit.edu.in",
      phone: "6398937356"
    }
  };

  const bodyString = JSON.stringify(body);

  // ✅ Must include ts + method + path + body
  const signatureBase = ts + method + path + bodyString;

  const signature = crypto
    .createHmac("sha256", APP_SECRET)
    .update(signatureBase)
    .digest("hex");

  try {
    const res = await axios.post(
      "https://api.sumsub.com/resources/accessTokens/sdk",
      body,
      {
        headers: {
          "Content-Type": "application/json",
          "X-App-Token": APP_TOKEN,
          "X-App-Access-Ts": ts,
          "X-App-Access-Sig": signature
        }
      }
    );

    console.log("✅ Access token generated:", res.data);
  } catch (err) {
    console.error("❌ Error:", err.response?.data || err.message);
  }
}

getAccessToken();
