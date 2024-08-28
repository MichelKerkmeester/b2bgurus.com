// Home
// Pre-Loader Animation

// Immediately hide page--wrapper and ensure loader--content is displayed
gsap.set(".page--wrapper", { display: "none" });
gsap.set(".loader--content", { display: "flex" });

function animateLogo() {
  const timeline = gsap.timeline();

  // Check device size
  const isTablet = window.innerWidth <= 768 && window.innerWidth > 479;
  const isMobile = window.innerWidth <= 479;

  // Set initial styles for loader--content
  gsap.set(".loader--content", {
    position: "absolute",
    top: "50%",
    left: isMobile ? "52.5%" : "50%",
    xPercent: -50,
    yPercent: -50,
    scale: isTablet ? 1.125 : isMobile ? 0.63 : 1,
    transformOrigin: "center center",
  });

  // Set initial states for animation elements
  gsap.set(".loader--b2b", {
    scale: isTablet ? 2.8125 : isMobile ? 1.89 : 2.5,
    x: 0,
    opacity: 0,
  });
  gsap.set(".loader--gurus", {
    x: isTablet ? "-3.75rem" : isMobile ? "-2.3625rem" : "-5rem",
    opacity: 0,
  });
  gsap.set(".loader--female", { opacity: 0, rotate: 0 });

  // Frame 1: B2B scaled up and fades in
  timeline.to(".loader--b2b", { opacity: 1, duration: 0.4, ease: "power2.in" });

  // Frame 2: B2B scales back
  timeline.to(".loader--b2b", {
    scale: 1,
    duration: 0.8,
    ease: "elastic.out(1, 0.95)",
  });

  // Frame 3: Gurus becomes visible and moves to original position
  timeline.to(
    ".loader--gurus",
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      ease: "power3.out",
    },
    ">"
  );

  // Frame 4: Female icon appears
  timeline.to(
    ".loader--female",
    {
      opacity: 1,
      duration: 0.4,
      ease: "power2.inOut",
    },
    "-=0.2"
  );

  // Frame 5: B2B, Gurus, and female move right, female rotates
  timeline
    .to(
      [".loader--b2b", ".loader--gurus", ".loader--female"],
      {
        x: isMobile ? "+=1.575rem" : "+=3rem",
        duration: 0.7,
        ease: "power3.out",
      },
      "move"
    )
    .to(
      ".loader--female",
      {
        rotate: isMobile ? 7.875 : 10,
        duration: 0.6,
        ease: "power3.out",
      },
      "move"
    );

  // Frame 6: Female rotates back
  timeline.to(
    ".loader--female",
    {
      rotate: isMobile ? -3.15 : -5,
      duration: 0.5,
      ease: "power2.out",
    },
    "-=0.1"
  );

  return timeline;
}

function revealContent() {
  return gsap.to(".page--loader", {
    yPercent: -100,
    duration: 0.8,
    ease: "power3.inOut",
    onComplete: () => {
      gsap.set(".page--loader", { display: "none" });
      // Dispatch preloaderFinished event
      document.dispatchEvent(new Event("preloaderFinished"));
      // Trigger in-view animations
      triggerInViewAnimations();
    },
  });
}

function triggerInViewAnimations() {
  // Select all elements with the 'home--in-view' class
  const inViewElements = document.querySelectorAll(".home--in-view");

  // Trigger the animation for each element
  inViewElements.forEach((element) => {
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  requestAnimationFrame(() => {
    const logoAnimation = animateLogo();
    const totalDuration = logoAnimation.duration();

    logoAnimation.then(() => {
      // Make page--wrapper visible before moving the loader
      gsap.set(".page--wrapper", { display: "block" });

      revealContent();
    });
  });
});

// Barba.js initialization for subsequent page transitions
barba.init({
  transitions: [
    {
      name: "default-transition",
      enter(data) {
        // Animate your content entering for subsequent page loads
        return gsap
          .from(data.next.container, {
            opacity: 0,
            duration: 0.5,
          })
          .then(() => {
            // Dispatch event for Barba.js transition
            document.dispatchEvent(new Event("barba:transition"));
            // Trigger in-view animations for the new page
            triggerInViewAnimations();
          });
      },
    },
  ],
});
