// Home
// Pre-Loader Animation
function animateLogo() {
  const timeline = gsap.timeline();

  // Check device size
  const isTablet = window.innerWidth <= 768 && window.innerWidth > 479;
  const isMobile = window.innerWidth <= 479;

  // Select the loader wrapper
  const loaderWrapper = document.querySelector(".page--loader");

  // Show the loader wrapper
  loaderWrapper.style.display = "block";

  // Immediately set initial styles to prevent glitch
  gsap.set(".loader--content", {
    position: "absolute",
    top: "50%",
    left: isMobile ? "52.5%" : "50%", // Move 2.5% to the right on mobile
    xPercent: -50,
    yPercent: -50,
    scale: isTablet ? 1.125 : isMobile ? 0.63 : 1,
    transformOrigin: "center center",
  });

  // Set initial states for animation elements
  gsap.set(".b2b", {
    scale: isTablet ? 2.8125 : isMobile ? 1.89 : 2.5,
    x: 0,
    opacity: 0,
  });
  gsap.set(".gurus", {
    x: isTablet ? "-3.75rem" : isMobile ? "-2.3625rem" : "-5rem",
    opacity: 0,
  });
  gsap.set(".female", { opacity: 0, rotate: 0 });

  // Frame 1: B2B scaled up and fades in
  timeline.to(".b2b", { opacity: 1, duration: 0.4, ease: "power2.in" });

  // Frame 2: B2B scales back
  timeline.to(".b2b", {
    scale: 1,
    duration: 0.8,
    ease: "elastic.out(1, 0.95)",
  });

  // Frame 3: Gurus becomes visible and moves to original position
  timeline.to(
    ".gurus",
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
    ".female",
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
      [".b2b", ".gurus", ".female"],
      {
        x: isMobile ? "+=1.575rem" : "+=3rem",
        duration: 0.7,
        ease: "power3.out",
      },
      "move"
    )
    .to(
      ".female",
      {
        rotate: isMobile ? 7.875 : 10,
        duration: 0.6,
        ease: "power3.out",
      },
      "move"
    );

  // Frame 6: Female rotates back
  timeline.to(
    ".female",
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
      document.querySelector(".page--loader").style.display = "none";
    },
  });
}

// Modified event listener
document.addEventListener("DOMContentLoaded", (event) => {
  // Hide the page content initially
  gsap.set(".page-wrapper", { opacity: 0 });

  // Run the logo animation
  const logoAnimation = animateLogo();
  const totalDuration = logoAnimation.duration();

  // Dispatch the "preloaderFinished" event
  // Adjust this timing as needed
  setTimeout(
    () => {
      document.dispatchEvent(new Event("preloaderFinished"));
    },
    (totalDuration - 0) * 1000
  );

  logoAnimation.then(() => {
    // Move the page--loader upwards
    revealContent().then(() => {
      // Fade in the page content after the page--loader has moved up
      gsap.to(".page-wrapper", {
        opacity: 1,
        duration: 0.5,
        ease: "power2.inOut",
      });
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
        return gsap.from(data.next.container, {
          opacity: 0,
          duration: 0.5,
        });
      },
    },
  ],
});
