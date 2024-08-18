document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const projectListItems = document.querySelectorAll(".project--list-item");
  if (projectListItems.length === 0) return;

  function isMobile() {
    return window.innerWidth < 992;
  }

  // Custom ultra-slow ease function
  const ultraSlowEase = (progress) => {
    return Math.pow(progress, 5); // This will create a very slow start
  };

  // Smoothing function
  const smooth = (value, target, factor = 0.05) => {
    return value + (target - value) * factor;
  };

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
      duration: 3,
      ease: "power1.inOut",
      onComplete: () => (mask.style.display = "none"),
    })
      .to(card, { scale: 1, yPercent: 0, duration: 3, ease: "power1.inOut" }, 0)
      .to(
        illustration,
        {
          opacity: 1,
          scale: 1,
          yPercent: 0,
          duration: 3,
          ease: "power1.inOut",
        },
        "-=2"
      )
      .to(
        image,
        { scale: 1, yPercent: 0, duration: 3, ease: "power1.inOut" },
        0
      );

    let currentProgress = 0;
    let targetProgress = 0;

    // Create ScrollTrigger
    ScrollTrigger.create({
      trigger: item,
      start: "top 90%",
      end: "bottom 20%", // Extend the end point to allow for slower animation
      onUpdate: (self) => {
        // Calculate target progress with delay and ultra-slow ease
        targetProgress = ultraSlowEase(Math.max(0, self.progress - 0.1));

        // Smooth the progress
        currentProgress = smooth(currentProgress, targetProgress, 0.02);

        // Apply the smoothed progress to the timeline
        tl.progress(currentProgress);
      },
      toggleActions: "play none none reverse",
    });
  });
});
