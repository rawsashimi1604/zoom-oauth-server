import express from "express";
import ZoomService from "./ZoomService.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.post("/zoom/token", async (req, res) => {
  const token = await ZoomService.getAccessToken();
  res.json({ token });
});

app.post("/zoom/meeting", async (req, res) => {
  const token = await ZoomService.getAccessToken();
  const meeting = await ZoomService.createMeeting(
    "looweiren@gmail.com",
    token.access_token
  );
  res.json({ meeting });
});

app.get("/zoom/meeting/details", async (req, res) => {
  const token = await ZoomService.getAccessToken();
  const meetingId = "x+XVSS5+SOqRo8JagX2mMw==";
  const meetingDetails = await ZoomService.getPastMeetingDetails(
    meetingId,
    token.access_token
  );
  res.json({ meetingDetails });
});

app.listen(port, () => {
  console.log("started listening on port " + port);
});
