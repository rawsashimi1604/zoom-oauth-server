import express from "express";
import ZoomService from "./ZoomService.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({ message: "hello world" });
});

app.post("/zoom/token", (req, res) => {
  ZoomService.getAccessToken();
});

app.listen(port, () => {
  console.log("started listening on port " + port);
});
