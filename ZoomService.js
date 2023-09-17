import axios from "axios";
import "dotenv/config";

async function getAccessToken() {
  const data = new URLSearchParams();

  data.append("grant_type", "account_credentials");
  data.append("account_id", process.env.ZOOM_ACCOUNT_ID);

  // encode credentials to base64
  const credentials = `${process.env.ZOOM_CLIENT_ID}:${process.env.ZOOM_CLIENT_SECRET}`;
  const encoded = btoa(credentials);

  const config = {
    headers: {
      Host: "zoom.us",
      Authorization: `Basic ${encoded}`,
    },
  };
  const res = await axios.post("https://zoom.us/oauth/token", data, config);
  console.log(res.data);
}

export default {
  getAccessToken,
};
