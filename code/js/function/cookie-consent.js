// Cookie that will track consent
var declineCookieName = "trackingDisabled";

// Function to check if decline cookie exists
function hasDeclined() {
  return Cookies.get(declineCookieName) !== undefined;
}

// Function to disable Google Analytics and other tracking scripts
function disableTracking() {
  // Disable Google Analytics
  window["ga-disable-G-KGZWBC07S1"] = true;

  // Set the decline cookie with a 7-day expiration
  Cookies.set(declineCookieName, "true", { expires: 7 });

  // Optionally remove existing cookies
  document.cookie =
    "tracking=disabled; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

  // Additional code to stop other trackers
}

// Check if the user has declined and disable tracking if so
if (hasDeclined()) {
  disableTracking();
}

// Handle consent button click (no action needed on accept)
document
  .getElementById("accept-cookies")
  .addEventListener("click", function () {
    document.getElementById("cookie-consent").style.display = "none";
  });

// Handle decline button click
document
  .getElementById("decline-cookies")
  .addEventListener("click", function () {
    disableTracking();
    document.getElementById("cookie-consent").style.display = "none";
  });

// Show the consent banner by default
document.getElementById("cookie-consent").style.display = "flex";
