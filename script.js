let sosTimer = null;

// PANIC BUTTON
document.getElementById("panicBtn").addEventListener("click", () => {
  triggerSOS("Panic Button");
});

// CANCEL BUTTON
document.getElementById("cancelBtn").addEventListener("click", cancelSOS);

// SHAKE DETECTION
window.addEventListener("devicemotion", event => {
  let acc = event.accelerationIncludingGravity;
  if (!acc) return;

  let total =
    Math.abs(acc.x) +
    Math.abs(acc.y) +
    Math.abs(acc.z);

  if (total > 35) {
    triggerSOS("Shake Detected");
  }
});

// TRIGGER SOS
function triggerSOS(type) {
  if (sosTimer) return; // prevent multiple triggers

  document.getElementById("status").innerText =
    `⚠️ ${type}! Sending SOS in 10 seconds...`;

  sosTimer = setTimeout(() => {
    sendSOS();
  }, 10000);
}

// CANCEL SOS
function cancelSOS() {
  if (sosTimer) {
    clearTimeout(sosTimer);
    sosTimer = null;
    document.getElementById("status").innerText =
      "✅ SOS cancelled. You are safe.";
  }
}

// SEND SOS
function sendSOS() {
  sosTimer = null;

  navigator.geolocation.getCurrentPosition(
    position => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;

      document.getElementById("status").innerText =
        "🚨 SOS SENT! Help is on the way.";

      showMap(lat, lng);
      shareWhatsApp(lat, lng);
    },
    () => {
      alert("Location access required!");
    }
  );
}

// SHOW GOOGLE MAP
function showMap(lat, lng) {
  let map = new google.maps.Map(document.getElementById("map"), {
    center: { lat, lng },
    zoom: 15
  });

  new google.maps.Marker({
    position: { lat, lng },
    map: map,
    title: "User Location"
  });
}

// WHATSAPP SOS (NO BACKEND NEEDED)
function shareWhatsApp(lat, lng) {
  let message =
    `🚨 WOMEN SAFETY ALERT 🚨%0A` +
    `I need immediate help!%0A%0A` +
    `📍 My Live Location:%0A` +
    `https://maps.google.com/?q=${lat},${lng}`;

  let url = `https://wa.me/?text=${message}`;
  window.open(url, "_blank");
}

