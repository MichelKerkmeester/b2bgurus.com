document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const projectListItems = document.querySelectorAll(".project--list-item");
  if (projectListItems.length === 0) return;

  function isMobile() {
    return window.innerWidth < 992;
  }

  // Lerp function for smooth interpolation
  function lerp(start, end, t) {
    return start * (1 - t) + end * t;
  }

  projectListItems.forEach((item, index) => {
    const suffix = isMobile() ? "--mobile" : "";
    const card = item.querySelector(`#project-card${suffix}`);
    const imageWrapper = card.querySelector(`#project-image-w${suffix}`);
    const image = imageWrapper.querySelector(`#project-image${suffix}`);
    const illustration = item.querySelector(`#project-bg${suffix}`);

    const direction = index % 2 === 0 ? -100 : 100;

    // Initial states
    gsap.set(card, { scale: 0.8, yPercent: 50 });
    gsap.set(image, { scale: 1.4 });
    gsap.set(illustration, { scale: 0.7, yPercent: 30, opacity: 0 });

    let progress = 0;
    let targetProgress = 0;

    // Speed control: Adjust this value to control overall animation speed
    // Lower values = slower animation, Higher values = faster animation
    const speed = 0.1;

    ScrollTrigger.create({
      trigger: item,
      start: "top 90%",
      end: "bottom 75%",
      onUpdate: (self) => {
        targetProgress = self.progress;
      },
    });

    function animateItem() {
      progress = lerp(progress, targetProgress, speed);

      // Card animation
      gsap.to(card, {
        scale: 0.8 + 0.2 * progress, // Scales from 0.8 to 1
        yPercent: 50 - 50 * progress, // Moves up by 50% of its height
        duration: 0,
      });

      // Illustration animation
      gsap.to(illustration, {
        opacity: progress, // Fades in from 0 to 1
        scale: 0.7 + 0.3 * progress, // Scales from 0.7 to 1
        yPercent: 30 - 30 * progress, // Moves up by 30% of its height
        duration: 0,
      });

      // Image animation
      gsap.to(image, {
        scale: 1.4 - 0.4 * progress, // Scales from 1.4 to 1
        duration: 0,
      });

      requestAnimationFrame(animateItem);
    }

    animateItem();
  });
});
