const express = require("express");
const twilio = require("twilio");
const app = express();

app.use(express.json());

const client = new twilio("SID", "AUTH_TOKEN");

app.post("/send-sos", (req, res) => {
  const { lat, lng } = req.body;

  client.messages.create({
    body: `🚨 EMERGENCY!\nLocation: https://maps.google.com/?q=${lat},${lng}`,
    from: "TWILIO_NUMBER",
    to: "YOUR_PHONE_NUMBER"
  });

  res.send("SOS Sent");
});

app.listen(3000);
