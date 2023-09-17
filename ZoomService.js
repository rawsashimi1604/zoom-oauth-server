import axios from "axios";

async function getAccessToken() {
  const data = new URLSearchParams();

  data.append("grant_type", "account_credentials");
  data.append("account_id", "account_id");

  const config = {
    headers: {
      Host: "zoom.us",
      Authorization: `Basic 123`,
    },
  };
  const res = await axios.post("https://zoom.us/oauth/token", data, config);
  console.log(res.data);
}

export default {
  getAccessToken,
};
