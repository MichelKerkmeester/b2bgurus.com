// Input field - Focus handling
Webflow.push(() => {
  const formElements = document.querySelectorAll("input, textarea, select");
  let usingKeyboard = false;

  // Track input method (keyboard vs mouse)
  document.addEventListener("mousedown", () => {
    usingKeyboard = false;
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      usingKeyboard = true;
    }
  });

  // Apply Webflow's native focus classes based on input method
  formElements.forEach((element) => {
    element.addEventListener("focus", function () {
      if (usingKeyboard) {
        // Keyboard navigation - show focus ring
        this.classList.add("w--focus-visible");
        this.classList.remove("w--focus");
      } else {
        // Mouse interaction - show border only
        this.classList.add("w--focus");
        this.classList.remove("w--focus-visible");
      }
    });

    element.addEventListener("blur", function () {
      this.classList.remove("w--focus", "w--focus-visible");
    });
  });
});
