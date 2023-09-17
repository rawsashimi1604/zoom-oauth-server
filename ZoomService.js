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
  return res.data;
}

async function createMeeting(userId, token) {
  const config = {
    headers: {
      Host: "zoom.us",
      Authorization: "Bearer " + token,
    },
  };

  const startTime = new Date();
  startTime.setHours(22, 0, 0, 0);

  const body = {
    agenda: "Some random Agenda",
    join_before_host: true,
    start_time: startTime.toISOString(),
  };

  const res = await axios.post(
    `https://api.zoom.us/v2/users/${userId}/meetings`,
    body,
    config
  );
  return res.data;
}

async function getPastMeetingDetails(meetingId, token) {
  const config = {
    headers: {
      Host: "zoom.us",
      Authorization: "Bearer " + token,
    },
  };

  const res = await axios.get(
    `https://api.zoom.us/v2/past_meetings/${meetingId}`,
    config
  );
  return res.data;
}

export default {
  getAccessToken,
  createMeeting,
  getPastMeetingDetails,
};
