document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const projectListItems = document.querySelectorAll(".project--list-item");
  if (projectListItems.length === 0) return;

  function isMobile() {
    return window.innerWidth < 992;
  }

  // Custom slow-motion factor (adjust this to control overall speed)
  const slowMotionFactor = 0.05; // Lower value = slower animation

  projectListItems.forEach((item, index) => {
    const suffix = isMobile() ? "--mobile" : "";

    const card = item.querySelector(`#project-card${suffix}`);
    const imageWrapper = card.querySelector(`#project-image-w${suffix}`);
    const image = imageWrapper.querySelector(`#project-image${suffix}`);
    const illustration = item.querySelector(`#project-bg${suffix}`);

    const direction = index % 2 === 0 ? -100 : 100;

    // Create and style mask for fade-in effect
    const mask = document.createElement("div");
    mask.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      width: 200%;
      height: 200%;
      background-color: transparent;
      transform: translate(-50%, -50%) scale(0);
      border-radius: 50%;
    `;
    card.style.position = "relative";
    card.style.overflow = "hidden";
    card.appendChild(mask);

    // Set initial states for animation
    gsap.set(card, { scale: 0.8, yPercent: 50 });
    gsap.set(image, { scale: 1.4 });
    gsap.set(illustration, { scale: 0.7, yPercent: 30, opacity: 0 });

    // Create animation timeline
    const tl = gsap.timeline({ paused: true });

    // Animate mask to reveal content
    tl.to(mask, {
      scale: 5,
      duration: 1.5,
      ease: "power2.out",
      onComplete: () => (mask.style.display = "none"),
    })
      .to(card, { scale: 1, yPercent: 0, duration: 2, ease: "power1.inOut" }, 0)
      .to(
        illustration,
        {
          opacity: 1,
          scale: 1,
          yPercent: 0,
          duration: 2,
          ease: "power1.inOut",
        },
        "-=1.25"
      )
      .to(
        image,
        { scale: 1, yPercent: 0, duration: 2, ease: "power1.inOut" },
        0
      );

    let animationProgress = 0;
    let lastTime = 0;

    // Custom ticker function
    function customTicker(time) {
      if (lastTime === 0) {
        lastTime = time;
        requestAnimationFrame(customTicker);
        return;
      }

      const delta = (time - lastTime) / 1000; // Convert to seconds
      lastTime = time;

      // Update animation progress
      if (ScrollTrigger.isInViewport(item, 0.5)) {
        animationProgress = Math.min(
          1,
          animationProgress + delta * slowMotionFactor
        );
      } else {
        animationProgress = Math.max(
          0,
          animationProgress - delta * slowMotionFactor
        );
      }

      // Apply progress to timeline
      tl.progress(animationProgress);

      requestAnimationFrame(customTicker);
    }

    // Start the custom ticker
    requestAnimationFrame(customTicker);

    // Create ScrollTrigger (only for marking the trigger point)
    ScrollTrigger.create({
      trigger: item,
      start: "top 90%",
      end: "bottom 75%",
      markers: true, // Remove this in production
    });
  });
});
