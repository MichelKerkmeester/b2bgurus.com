// Projects
// GSAP Parallax
function initProjectsParallax() {
  function isDesktop() {
    return window.innerWidth >= 992; // Check if the device is a desktop
  }

  if (isDesktop()) {
    gsap.registerPlugin(ScrollTrigger);

    const projectListItems = document.querySelectorAll(".project--list-item");
    if (projectListItems.length === 0) return;

    function lerp(start, end, t) {
      return start * (1 - t) + end * t;
    }

    projectListItems.forEach((item, index) => {
      const projectImage = item.querySelector(".project--image");
      const projectInfo = item.querySelector(".project--info");

      let progress = 0;
      let targetProgress = 0;

      // Speed control: Adjust this value to control overall animation speed
      const speed = 0.1; // Lower values = slower animation, Higher values = faster animation

      // Set initial states
      gsap.set(projectImage, { scale: 0.8, opacity: 0 });
      gsap.set(projectInfo, { y: "3.125rem", opacity: 0 });

      ScrollTrigger.create({
        trigger: item,
        start: "top 80%",
        end: "bottom 30%",
        onUpdate: (self) => {
          targetProgress = self.progress;
        },
      });

      function animateItem() {
        progress = lerp(progress, targetProgress, speed);

        // Animate project image
        gsap.to(projectImage, {
          scale: 0.8 + 0.2 * progress,
          opacity: progress,
          duration: 0,
        });

        // Animate project info
        gsap.to(projectInfo, {
          y: 3.125 * (1 - progress) + "rem",
          opacity: progress,
          duration: 0,
        });

        requestAnimationFrame(animateItem);
      }

      // Start the animation
      animateItem();
    });
  }
}

// Initialize on DOMContentLoaded and after preloader/page transitions
document.addEventListener("DOMContentLoaded", initProjectsParallax);
document.addEventListener("preloaderFinished", initProjectsParallax);
document.addEventListener("barba:transition", initProjectsParallax);
