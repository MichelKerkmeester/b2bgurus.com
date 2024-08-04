window.Webflow ||= [];
window.Webflow.push(() => {
  const name = "Michel Kerkmeester";
  greetUser(name);
});

document.addEventListener("DOMContentLoaded", () => {
  const projectImages = document.querySelectorAll(".project--pgn-image");

  projectImages.forEach((image) => {
    const footer = image.querySelector(".project--pgn-footer");

    // Add hover event listeners to the image
    image.addEventListener("mouseenter", () => {
      // Animate background color change on hover
      gsap.to(footer, {
        duration: 0.3,
        backgroundColor: "rgba(9, 25, 29, 0.96)",
      });
    });

    image.addEventListener("mouseleave", () => {
      // Reset background color when hover ends
      gsap.to(footer, {
        duration: 0.3,
        backgroundColor: "rgba(19, 51, 58, 0.95)",
      });
    });
  });
});
