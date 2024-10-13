// Pre-loader + Animate in view

// Hero
// Animate in view
function animateHeroIntro() {
  const isMobileOrTablet = window.innerWidth < 992; // This includes both mobile and tablet
  const suffix = isMobileOrTablet ? "--mobile" : "";
  const elements = `#hero-caption${suffix}, #hero-heading-1${suffix}, #hero-heading-2${suffix}, #hero-description${suffix}, #hero-button${suffix}, #hero-marquee, #hero-male${suffix}, #hero-female${suffix}, #hero-cursor${suffix}, #hero-other${suffix}`;
  const heroImage = `#hero-image${suffix}`;

  // Set initial styles for hero elements
  gsap.set(elements, {
    opacity: 0,
    y: isMobileOrTablet ? "10vh" : "8vh",
  });

  // Set initial styles for hero image
  gsap.set(heroImage, {
    y: isMobileOrTablet ? "12vh" : "14vh",
  });

  const tl = gsap.timeline({
    defaults: { ease: "power3.out", duration: isMobileOrTablet ? 0.8 : 0.9 },
  });

  // Animate hero elements
  tl.to(elements, {
    opacity: 1,
    y: 0,
    stagger: isMobileOrTablet ? 0.08 : 0.1,
  });

  // Animate hero image
  tl.to(
    heroImage,
    {
      y: 0,
      duration: isMobileOrTablet ? 0.8 : 0.9,
      ease: "power3.out",
    },
    "<"
  ); // Sync with the start of the elements animation

  return tl;
}

// Home
// Pre-loader
function animateLogo() {
  const timeline = gsap.timeline();
  const isTabletDevice = window.innerWidth <= 768 && window.innerWidth > 479;
  const isMobileDevice = window.innerWidth <= 479;

  // Initial setup for loader content
  gsap.set(".loader--content", {
    position: "absolute",
    top: "50%",
    left: isMobileDevice ? "55%" : "50%",
    xPercent: -50,
    yPercent: -50,
    scale: isTabletDevice ? 1.125 : isMobileDevice ? 0.63 : 1,
    transformOrigin: "center center",
    display: "flex",
    opacity: 1,
  });

  // Initial states for animation elements
  gsap.set(".loader--b2b", {
    scale: isTabletDevice ? 2.8125 : isMobileDevice ? 1.89 : 2.5,
    x: 0,
    opacity: 0,
    display: "block",
  });
  gsap.set(".loader--gurus", {
    x: isTabletDevice ? "-3.75rem" : isMobileDevice ? "-2.3625rem" : "-5rem",
    opacity: 0,
    display: "block",
  });
  gsap.set(".loader--female", {
    opacity: 0,
    rotate: 0,
    display: "block",
  });

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
        x: isMobileDevice ? "+=1.575rem" : "+=3rem",
        duration: 0.7,
        ease: "power3.out",
      },
      "move"
    )
    .to(
      ".loader--female",
      {
        rotate: isMobileDevice ? 7.875 : 10,
        duration: 0.6,
        ease: "power3.out",
      },
      "move"
    );

  // Frame 6: Female rotates back
  timeline.to(
    ".loader--female",
    {
      rotate: isMobileDevice ? -3.15 : -5,
      duration: 0.5,
      ease: "power2.out",
    },
    "-=0.1"
  );

  // After Frame 6: Reveal content and start hero intro
  timeline
    .add(() => {
      gsap.set(".page--wrapper", { display: "block" });
      return revealContent();
    })
    .add(animateHeroIntro()); // Start hero intro animation

  return timeline;
}

function revealContent() {
  return gsap.to(".page--loader", {
    yPercent: -100, // Move the loader up and out of view
    duration: window.innerWidth <= 479 ? 0.6 : 0.8, // Faster animation for mobile
    ease: "power3.inOut", // Smooth easing for natural movement
    onStart: () => {
      // Dispatch event to signal preloader has finished
      document.dispatchEvent(new Event("preloaderFinished"));
    },
    onComplete: () => {
      // Hide the loader completely after animation
      gsap.set(".page--loader", { display: "none" });
      // Trigger animations for elements coming into view
      triggerInViewAnimations();
    },
  });
}

// Trigger animations for elements as they come into view
function triggerInViewAnimations() {
  const inViewElements = document.querySelectorAll(".home--in-view");
  inViewElements.forEach((element) => {
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  });
}

// Initial page load
document.addEventListener("DOMContentLoaded", () => {
  // Initialize parallax effects immediately on page load
  if (window.initProjectsParallax) window.initProjectsParallax();

  if (
    window.location.pathname.includes("index.html") ||
    window.location.pathname === "/"
  ) {
    requestAnimationFrame(() => {
      animateLogo(); // Start the main animation sequence for home
    });
  } else {
    animateHeroIntro(); // Start hero animation for other pages
  }
});

// Prevent flash of unstyled content
document.addEventListener("DOMContentLoaded", () => {
  gsap.to("body", { opacity: 1, duration: 0 });
});

// Dispatch event to signal preloader has finished
document.addEventListener("preloaderFinished", () => {
  if (window.initProcessParallax) window.initProcessParallax();
});
