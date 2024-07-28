// Text link
// Animated line on Hover
$(document).ready(function () {
  $(".btn--link-highlight").css({ width: "0%", visibility: "hidden" }); // Initially hide the line

  $(".btn--link").each(function () {
    $(this).hover(
      function () {
        // Mouse enter animation
        gsap.to($(this).find(".btn--link-highlight"), {
          duration: 0.3, // Animation duration in seconds
          width: "100%", // Expand the line to full width
          visibility: "visible", // Make the line visible
          ease: "power1.out", // Easing function for smooth animation
        });
      },
      function () {
        // Mouse leave animation
        gsap.to($(this).find(".btn--link-highlight"), {
          duration: 0.3, // Animation duration in seconds
          width: "0%", // Collapse the line to zero width
          ease: "power1.out", // Easing function for smooth animation
        });
      }
    );
  });
});
