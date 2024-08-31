// Projects
// GSAP Parallax

window.initProjectsParallax = function () {
  gsap.registerPlugin(ScrollTrigger);

  // Select all project list items
  const projectListItems = document.querySelectorAll(".project--list-item");
  if (projectListItems.length === 0) return; // Exit if no items found

  // Linear interpolation function for smooth animations
  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  projectListItems.forEach((item) => {
    // Select elements within each project item
    const card = item.querySelector(`[id^="project-card"]`);
    const imageWrapper = card.querySelector(`[id^="project-image-w"]`);
    const image = imageWrapper.querySelector(`[id^="project-image"]`);
    const illustration = item.querySelector(`[id^="project-bg"]`);

    // Set initial states for animation
    gsap.set(card, { scale: 0.9, yPercent: 25 });
    gsap.set(image, { scale: 1.4 });
    if (illustration) {
      gsap.set(illustration, { scale: 0.7, yPercent: 30, opacity: 0 });
    }

    // Animation progress variables
    let progress = 0;
    let targetProgress = 0;
    const speed = 0.1; // Determines how quickly the animation responds to scroll

    // Create a ScrollTrigger for each project item
    ScrollTrigger.create({
      trigger: item,
      start: "top 95%",
      end: "bottom 85%", // End when the bottom of the item reaches 85% from the top of the viewport
      onUpdate: (self) => {
        targetProgress = self.progress; // Update target progress based on scroll position
      },
    });

    // Animation function that runs every frame
    function animateItem() {
      // Smoothly interpolate between current and target progress
      progress = lerp(progress, targetProgress, speed);

      // Animate the card
      gsap.to(card, {
        scale: 0.9 + 0.1 * progress, // Scale up slightly as it comes into view
        yPercent: 25 - 25 * progress, // Move up as it comes into view
        duration: 0, // Set to 0 for immediate update each frame
      });

      // Animate the image
      gsap.to(image, {
        scale: 1.4 - 0.4 * progress, // Scale down as it comes into view
        duration: 0,
      });

      // Animate the illustration if it exists
      if (illustration) {
        gsap.to(illustration, {
          opacity: progress, // Fade in as it comes into view
          scale: 0.7 + 0.3 * progress, // Scale up as it comes into view
          yPercent: 30 - 30 * progress, // Move up as it comes into view
          duration: 0,
        });
      }

      // Continue the animation loop
      requestAnimationFrame(animateItem);
    }

    // Start the animation loop
    animateItem();
  });
};

// Function to initialize parallax
function initializeParallax() {
  if (window.initProjectsParallax) {
    window.initProjectsParallax();
  }
}

// Check if the page has a preloader
if (document.querySelector(".page--loader")) {
  // If there's a preloader, wait for the preloaderFinished event
  document.addEventListener("preloaderFinished", initializeParallax);
} else {
  // If there's no preloader, initialize parallax on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", initializeParallax);
}
