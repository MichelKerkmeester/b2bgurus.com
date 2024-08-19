// Hero
// Intro Animation
document.addEventListener("DOMContentLoaded", function () {
  function isMobile() {
    return window.innerWidth < 992;
  }

  // Function to split text into individual <span> tags
  const splitText = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.innerHTML = element.textContent
        .split("")
        .map((char) => `<span>${char}</span>`)
        .join("");
    }
  };

  // Function to set up and run the animation
  function runAnimation() {
    const mobile = isMobile(); // Determine if the device is mobile

    // Apply splitText to specific elements
    splitText(`[id^="hero-marketing"]`);
    splitText(`[id^="hero-gurus"]`);

    // Set initial styles for elements
    gsap.set(
      `[id^="hero-caption"], [id^="hero-marketing"] span, [id^="hero-gurus"] span, [id^="hero-description"], [id^="hero-button"], #hero-marquee`,
      {
        opacity: 0,
        y: mobile ? "1.5rem" : "3.125rem", // Different starting positions for mobile and desktop
      }
    );
    gsap.set(`[id^="hero-male"], [id^="hero-female"], [id^="hero-cursor"]`, {
      opacity: 0,
      scale: 0.5,
      y: mobile ? "1rem" : "1.875rem", // Different starting positions for mobile and desktop
    });

    // Create GSAP timeline for animations
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: mobile ? 0.8 : 1 }, // Faster animation for mobile
    });

    // Animate elements into view
    tl.to(`[id^="hero-caption"]`, { opacity: 1, y: 0 }) // Animate caption
      .to(
        `[id^="hero-marketing"] span, [id^="hero-gurus"] span`,
        { opacity: 1, y: 0, stagger: mobile ? 0.03 : 0.04 }, // Animate marketing and gurus text
        "-=0.7"
      )
      .to(
        `[id^="hero-male"], [id^="hero-cursor"]`,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: mobile ? 0.15 : 0.2,
          ease: mobile ? "back.out(1.7)" : "elastic.out(1, 0.7)", // Different easing for mobile and desktop
          onComplete: function (targets) {
            // Add floating animation after initial animation
            gsap.to(targets, {
              y: mobile ? "-0.3rem" : "-0.625rem",
              duration: mobile ? 1 : 1.2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          },
        },
        "-=0.6"
      )
      .to(
        `[id^="hero-female"], [id^="hero-description"], [id^="hero-button"], #hero-marquee`,
        { opacity: 1, scale: 1, y: 0, stagger: mobile ? 0.08 : 0.1 }, // Animate remaining elements
        "-=0.6"
      )
      .to(
        `[id^="hero-cursor"]`,
        {
          x: mobile ? "-0.9375rem" : "-1.875rem",
          y: mobile ? "-0.9375rem" : "-1.875rem",
          duration: 0.5,
          ease: "power2.inOut",
        }, // Move cursor
        "+=0.3"
      )
      .to(
        `[id^="hero-cursor"]`,
        { scale: 0.9, duration: 0.2, ease: "power2.in" }, // Scale down cursor
        "-=0.15"
      )
      .to(
        `[id^="hero-caption"]`,
        { scale: 0.95, duration: 0.2, ease: "power2.in" }, // Scale down caption
        "<"
      )
      .to(`[id^="hero-cursor"]`, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.5)",
      }) // Scale up cursor
      .to(
        `[id^="hero-caption"]`,
        { scale: 1, duration: 0.45, ease: "elastic.out(1, 0.5)" }, // Scale up caption
        "-=0.2"
      )
      .to(
        `[id^="hero-cursor"]`,
        { x: 0, y: 0, duration: 0.7, ease: "power2.inOut" }, // Move cursor back to original position
        "-=0.3"
      );
  }

  // Run the animation
  runAnimation();
});
