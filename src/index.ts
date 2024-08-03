window.Webflow ||= [];
window.Webflow.push(() => {
  const name = "Michel Kerkmeester";
  greetUser(name);
});

document.addEventListener("DOMContentLoaded", () => {
  // Select all project cards
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    // Get the overlay element within the current card
    const overlay = card.querySelector(".project--pgn-overlay");

    // Set initial overlay opacity to 0
    gsap.set(overlay, { opacity: 0 });

    // Add hover event listeners to the card
    card.addEventListener("mouseenter", () => {
      gsap.to(overlay, { duration: 0.5, opacity: 1 });
    });

    card.addEventListener("mouseleave", () => {
      gsap.to(overlay, { duration: 0.5, opacity: 0 });
    });
  });
});
