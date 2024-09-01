// Text link
// Animated line on Hover
$(document).ready(function () {
  $(".btn--link-highlight").css({ width: "0%", visibility: "hidden" }); // Initially hide the line

  $(".btn--link").each(function () {
    $(this).hover(
      function () {
        // Mouse enter animation
        gsap.to($(this).find(".btn--link-highlight"), {
          duration: 0.3,
          width: "100%",
          visibility: "visible",
          ease: "power1.out",
        });
      },
      function () {
        // Mouse leave animation
        gsap.to($(this).find(".btn--link-highlight"), {
          duration: 0.3,
          width: "0%",
          ease: "power1.out",
        });
      }
    );
  });
});
