// Wait until all scripts/resources are loaded
window.addEventListener("load", function () {
  // Names of the cookies to track consent or decline
  var consentCookieName = "cookieConsent";
  var declineCookieName = "cookieDecline";

  // Function to check if the consent cookie exists
  function hasConsented() {
    return Cookies.get(consentCookieName) !== undefined;
  }

  // Function to check if the decline cookie exists
  function hasDeclined() {
    return Cookies.get(declineCookieName) !== undefined;
  }

  // Function to disable Google Analytics and set the decline cookie
  function disableTracking() {
    window["ga-disable-G-KGZWBC07S1"] = true;
    Cookies.set(declineCookieName, "true", { expires: 7 });
    document.cookie =
      "tracking=disabled; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }

  // Function to hide the consent banner with an animation
  function hideBanner() {
    gsap.to("#cookie-consent", {
      y: "100vh",
      duration: 1,
      ease: "cubic-bezier(0.645, 0.045, 0.355, 1)",
      onComplete: function () {
        document.getElementById("cookie-consent").style.display = "none";
      },
    });
  }

  // Handle the acceptance of cookies
  document
    .getElementById("cookie-accept")
    .addEventListener("click", function () {
      console.log("Cookies accepted"); // Debugging line
      Cookies.set(consentCookieName, "true", { expires: 7 });
      hideBanner();
    });

  // Handle the decline of cookies
  document
    .getElementById("cookie-decline")
    .addEventListener("click", function () {
      console.log("Cookies declined"); // Debugging line
      disableTracking();
      hideBanner();
    });

  // Check if the user has already consented or declined
  if (!hasConsented() && !hasDeclined()) {
    // Initially set the modal to display: none
    document.getElementById("cookie-consent").style.display = "none";

    // Show modal after a delay, then start the animation
    setTimeout(function () {
      document.getElementById("cookie-consent").style.display = "block";
      gsap.fromTo(
        "#cookie-consent",
        { y: "100vh" }, // Start position off-screen
        {
          y: "0vh", // End position in view
          duration: 1, // Duration of the animation
          ease: "cubic-bezier(0.645, 0.045, 0.355, 1)",
        }
      );
    }, 10000); // Delay before showing the modal
  } else {
    // If the user has already consented or declined, keep the modal hidden
    document.getElementById("cookie-consent").style.display = "none";
  }
});
