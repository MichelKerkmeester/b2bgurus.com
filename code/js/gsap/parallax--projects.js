// Projects
// GSAP Parallax

document.addEventListener("DOMContentLoaded", initProjectsParallax);

function initProjectsParallax() {
  gsap.registerPlugin(ScrollTrigger);

  const projectListItems = document.querySelectorAll(".project--list-item");
  if (projectListItems.length === 0) return;

  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  function isMobile() {
    return window.innerWidth <= 767;
  }

  projectListItems.forEach((item) => {
    const card = item.querySelector(`[id^="project-card"]`);
    const imageWrapper = card.querySelector(`[id^="project-image-w"]`);
    const image = imageWrapper.querySelector(`[id^="project-image"]`);
    const illustration = isMobile()
      ? null
      : item.querySelector(`[id^="project-bg"]`);

    // Set initial states based on device type
    if (isMobile()) {
      gsap.set(card, { scale: 0.8, yPercent: 35 });
      gsap.set(image, { scale: 1.4 });
    } else {
      gsap.set(card, { scale: 0.8, yPercent: 50 });
      gsap.set(image, { scale: 1.4 });
      if (illustration) {
        gsap.set(illustration, { scale: 0.7, yPercent: 30, opacity: 0 });
      }
    }

    let progress = 0;
    let targetProgress = 0;

    // Adjust speed based on device type
    const speed = isMobile() ? 0.25 : 0.1;

    ScrollTrigger.create({
      trigger: item,
      start: "top 95%",
      end: "bottom 85%",
      onUpdate: (self) => {
        targetProgress = self.progress;
      },
    });

    function animateItem() {
      progress = lerp(progress, targetProgress, speed);

      if (isMobile()) {
        // Subtle animation for mobile, without illustration
        gsap.to(card, {
          scale: 0.8 + 0.2 * progress,
          yPercent: 35 - 35 * progress,
          duration: 0,
        });
        gsap.to(image, {
          scale: 1.4 - 0.4 * progress,
          duration: 0,
        });
      } else {
        // Regular animation for tablet and desktop
        gsap.to(card, {
          scale: 0.8 + 0.2 * progress,
          yPercent: 50 - 50 * progress,
          duration: 0,
        });
        gsap.to(image, {
          scale: 1.4 - 0.4 * progress,
          duration: 0,
        });
        if (illustration) {
          gsap.to(illustration, {
            opacity: progress,
            scale: 0.7 + 0.3 * progress,
            yPercent: 30 - 30 * progress,
            duration: 0,
          });
        }
      }

      requestAnimationFrame(animateItem);
    }
    animateItem();
  });
}
