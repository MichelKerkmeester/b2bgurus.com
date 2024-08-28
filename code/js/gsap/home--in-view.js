// Hero
// Intro Animation

function initHomeInView() {
  // Function to detect if the user is on a desktop or mobile
  function isMobile() {
    return window.innerWidth < 992;
  }

  function isDesktop() {
    return window.innerWidth >= 992;
  }

  // Function to set up and run the animation
  function runAnimation(isMobile) {
    const suffix = isMobile ? "--mobile" : "";

    // Set initial styles for elements
    gsap.set(
      `#hero-caption${suffix}, #hero-marketing${suffix}, #hero-gurus${suffix}, #hero-description${suffix}, #hero-button${suffix}, #hero-marquee, #hero-male${suffix}, #hero-female${suffix}, #hero-cursor${suffix}`,
      {
        opacity: 0,
        y: isMobile ? "2rem" : "4rem",
      }
    );

    // Create GSAP timeline for animations
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: isMobile ? 0.8 : 1 },
    });

    // Animate elements moving upwards
    tl.to(
      `#hero-caption${suffix}, #hero-marketing${suffix}, #hero-gurus${suffix}, #hero-description${suffix}, #hero-button${suffix}, #hero-marquee, #hero-male${suffix}, #hero-female${suffix}, #hero-cursor${suffix}`,
      {
        opacity: 1,
        y: 0,
        stagger: isMobile ? 0.08 : 0.1,
      }
    )
      // Cursor click animation
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

  // Function to animate in-view elements
  function animateInViewElements() {
    const elements = document.querySelectorAll(".home--in-view");
    elements.forEach((element) => {
      gsap.fromTo(
        element,
        {
          opacity: 0,
          y: "3.125rem",
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 80%",
          },
        }
      );
    });
  }

  // Function to set up all animations
  function setupAnimations() {
    // Run the appropriate animation based on device type
    if (isMobile()) {
      runAnimation(true);
    } else if (isDesktop()) {
      runAnimation(false);
    }

    // Animate in-view elements
    animateInViewElements();
  }

  // Run on initial page load
  setupAnimations();

  // Run after preloader finishes
  document.addEventListener("preloaderFinished", setupAnimations, {
    once: true,
  });

  // Run after Barba.js transitions
  document.addEventListener("barba:transition", setupAnimations);
}

// Initialize on DOMContentLoaded
document.addEventListener("DOMContentLoaded", initHomeInView);
