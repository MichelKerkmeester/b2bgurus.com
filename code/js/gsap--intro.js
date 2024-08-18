// Hero
// Intro Animation
document.addEventListener("DOMContentLoaded", function () {
  // Function to detect if the user is on a desktop or mobile
  function isMobile() {
    return window.innerWidth < 992;
  }

  function isDesktop() {
    return window.innerWidth >= 992;
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
  function runAnimation(isMobile) {
    const suffix = isMobile ? "--mobile" : "";

    // Apply splitText to specific elements
    splitText(`#hero-marketing${suffix}`);
    splitText(`#hero-gurus${suffix}`);

    // Set initial styles for elements
    gsap.set(
      `#hero-caption${suffix} span, #hero-marketing${suffix} span, #hero-gurus${suffix} span, #hero-description${suffix}, #hero-button${suffix}, #hero-marquee`,
      {
        opacity: 0,
        y: isMobile ? "1.5rem" : "3.125rem",
      }
    );
    gsap.set(`#hero-caption${suffix}`, {
      opacity: 0,
      y: isMobile ? "1.5rem" : "3.125rem",
    });
    gsap.set(
      `#hero-male${suffix}, #hero-female${suffix}, #hero-cursor${suffix}`,
      {
        opacity: 0,
        scale: 0.5,
        y: isMobile ? "1rem" : "1.875rem",
      }
    );

    // Create GSAP timeline for animations
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: isMobile ? 0.8 : 1 },
    });

    // Animate in view
    tl.to(`#hero-caption${suffix}`, { opacity: 1, y: 0 })
      .to(
        `#hero-caption${suffix} span`,
        { opacity: 1, y: 0, stagger: isMobile ? 0.02 : 0.03 },
        "-=0.6"
      )
      .to(
        `#hero-marketing${suffix} span, #hero-gurus${suffix} span`,
        { opacity: 1, y: 0, stagger: isMobile ? 0.03 : 0.04 },
        "-=0.7"
      )
      .to(
        `#hero-male${suffix}, #hero-cursor${suffix}`,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: isMobile ? 0.15 : 0.2,
          ease: isMobile ? "back.out(1.7)" : "elastic.out(1, 0.7)",
          onComplete: function (targets) {
            gsap.to(targets, {
              y: isMobile ? "-0.3rem" : "-0.625rem",
              duration: isMobile ? 1 : 1.2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          },
        },
        "-=0.6"
      )
      .to(
        `#hero-female${suffix}, #hero-description${suffix}, #hero-button${suffix}, #hero-marquee`,
        { opacity: 1, scale: 1, y: 0, stagger: isMobile ? 0.08 : 0.1 },
        "-=0.6"
      )
      .to(
        `#hero-cursor${suffix}`,
        {
          x: isMobile ? "-0.9375rem" : "-1.875rem",
          y: isMobile ? "-0.9375rem" : "-1.875rem",
          duration: 0.5,
          ease: "power2.inOut",
        },
        "+=0.3"
      )
      .to(
        `#hero-cursor${suffix}`,
        { scale: 0.9, duration: 0.2, ease: "power2.in" },
        "-=0.15"
      )
      .to(
        `#hero-caption${suffix}`,
        { scale: 0.95, duration: 0.2, ease: "power2.in" },
        "<"
      )
      .to(`#hero-cursor${suffix}`, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.5)",
      })
      .to(
        `#hero-caption${suffix}`,
        { scale: 1, duration: 0.45, ease: "elastic.out(1, 0.5)" },
        "-=0.2"
      )
      .to(
        `#hero-cursor${suffix}`,
        { x: 0, y: 0, duration: 0.7, ease: "power2.inOut" },
        "-=0.3"
      );
  }

  // Run the appropriate animation based on device type
  if (isMobile()) {
    runAnimation(true);
  } else if (isDesktop()) {
    runAnimation(false);
  }
});
