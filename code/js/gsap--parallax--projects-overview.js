// Projects
// GSAP Parallax
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger); // Register the ScrollTrigger plugin

  const projectListItems = document.querySelectorAll(".project--list-item"); // Select all project list items
  if (projectListItems.length === 0) return; // Exit if no project list items found

  function lerp(start, end, t) {
    return start * (1 - t) + end * t; // Linear interpolation function
  }

  projectListItems.forEach((item, index) => {
    const card = item.querySelector(`[id^="project-card"]`); // Select the project card
    const imageWrapper = card.querySelector(`[id^="project-image-w"]`); // Select the image wrapper
    const image = imageWrapper.querySelector(`[id^="project-image"]`); // Select the project image
    const illustration = item.querySelector(`[id^="project-bg"]`); // Select the project illustration (if exists)

    // Set initial states
    gsap.set(card, { scale: 0.8, yPercent: 50 });
    gsap.set(image, { scale: 1.4 });
    if (illustration) {
      gsap.set(illustration, { scale: 0.7, yPercent: 30, opacity: 0 });
    }

    let progress = 0;
    let targetProgress = 0;

    const speed = 0.1; // Animation speed

    // Create a ScrollTrigger for each project list item
    ScrollTrigger.create({
      trigger: item,
      start: "top 90%",
      end: "bottom 80%",
      onUpdate: (self) => {
        targetProgress = self.progress;
      },
    });

    function animateItem() {
      progress = lerp(progress, targetProgress, speed); // Update progress using lerp

      // Animate the project card
      gsap.to(card, {
        scale: 0.8 + 0.2 * progress,
        yPercent: 50 - 50 * progress,
        duration: 0,
      });

      // Animate the project image
      gsap.to(image, {
        scale: 1.4 - 0.4 * progress,
        duration: 0,
      });

      // Animate the project illustration (if exists)
      if (illustration) {
        gsap.to(illustration, {
          opacity: progress,
          scale: 0.7 + 0.3 * progress,
          yPercent: 30 - 30 * progress,
          duration: 0,
        });
      }

      requestAnimationFrame(animateItem); // Request next animation frame
    }

    animateItem(); // Start the animation loop
  });
});
