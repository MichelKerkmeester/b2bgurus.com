document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger);

  const projectListItems = document.querySelectorAll(".project--list-item");
  if (projectListItems.length === 0) return; // Exit if no items found

  function isMobile() {
    return window.innerWidth < 992; // Check if the device is mobile
  }

  projectListItems.forEach((item, index) => {
    const suffix = isMobile() ? "--mobile" : ""; // Determine suffix based on device type

    const card = item.querySelector(`#project-card${suffix}`);
    const imageWrapper = card.querySelector(`#project-image-w${suffix}`);
    const image = imageWrapper.querySelector(`#project-image${suffix}`);
    const illustration = item.querySelector(`#project-bg${suffix}`);

    const direction = index % 2 === 0 ? -100 : 100; // Determine direction based on index

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

    // Create animation timeline triggered by scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: item,
        start: "top 90%",
        end: "bottom 75%",
        scrub: 1, // Smooth scrolling effect
        toggleActions: "play none none reverse", // Replay on scroll back
      },
    });

    // Animate mask to reveal content
    tl.to(mask, {
      scale: 5, // Expand mask to reveal
      duration: 1.5,
      ease: "power2.out",
      onComplete: () => (mask.style.display = "none"), // Remove mask after reveal
    })
      // Animate card
      .to(card, { scale: 1, yPercent: 0, duration: 2, ease: "power1.inOut" }, 0)
      // Animate illustration
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
      // Animate image
      .to(
        image,
        { scale: 1, yPercent: 0, duration: 2, ease: "power1.inOut" },
        0
      );
  });
});
