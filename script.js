const timeZones = {
  local: { name: "Local Time", offset: 0 },
  bg: { name: "Bulgaria", offset: 2 },
  us: { name: "USA (Eastern Time)", offset: -5 },
  uk: { name: "UK (GMT)", offset: 0 },
  cn: { name: "China", offset: 8 },
  au: { name: "Australia (Sydney)", offset: 10 },
};

let is24HourFormat = true;

function updateTimes() {
  const now = new Date();

  for (const [key, zone] of Object.entries(timeZones)) {
    const timeElement = document.getElementById(`time-${key}`);
    const offsetTime = calculateTimeWithOffset(now, zone.offset);
    timeElement.textContent = formatTime(offsetTime, is24HourFormat);
  }

  updateCustomTime(now);
}

function calculateTimeWithOffset(baseTime, offset) {
  const utcTime = baseTime.getTime() + baseTime.getTimezoneOffset() * 60000;
  return new Date(utcTime + offset * 3600000);
}

function formatTime(date, is24Hour) {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedHours = is24Hour
    ? hours.toString().padStart(2, "0")
    : (hours % 12 || 12).toString().padStart(2, "0");
  const period = !is24Hour ? (hours < 12 ? "AM" : "PM") : "";
  return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
}

function updateCustomTime(currentTime) {
  const customSelect = document.getElementById("custom-time-zone-select");
  const customOffset = parseInt(customSelect.value, 10);
  const customTime = calculateTimeWithOffset(currentTime, customOffset);

  const customTimeElement = document.getElementById("time-custom");
  const customTitle = document.getElementById("custom-time-zone-title");

  customTitle.textContent = `Custom 🌍 (UTC ${
    customOffset >= 0 ? "+" : ""
  }${customOffset})`;
  customTimeElement.textContent = formatTime(customTime, is24HourFormat);
}

document.getElementById("toggle-format").addEventListener("click", () => {
  is24HourFormat = !is24HourFormat;
  updateTimes();
});

document
  .getElementById("custom-time-zone-select")
  .addEventListener("change", () => {
    updateTimes();
  });

setInterval(updateTimes, 1000);
updateTimes();
