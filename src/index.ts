// ===== Initial Setup =====
// Set initial styles for page transition and preloader
gsap.set(".page--transition", { yPercent: 0, display: "none" });
gsap.set(".loader--content", { display: "flex" });
gsap.set(".page--wrapper", { display: "none" });

// ===== Preloader Animation =====
function animatePreloader() {
  // Create a GSAP timeline for the preloader animation
  const timeline = gsap.timeline();

  // Detect device size
  const isMobile = window.innerWidth <= 479;
  const isTablet = window.innerWidth <= 768 && window.innerWidth > 479;

  // Set initial styles for loader content
  gsap.set([".loader--content"], {
    position: "absolute",
    top: "50%",
    left: isMobile ? "55%" : "50%",
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

  // Return the timeline for later use
  return timeline;
}

// ===== Hero Intro Animation =====
function initHeroIntro() {
  // Function to detect if the user is on a desktop or mobile
  function isMobile() {
    return window.innerWidth < 992;
  }

  function isDesktop() {
    return window.innerWidth >= 992;
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

  // Function to set up and run the animation
  function runHeroAnimation(isMobile) {
    const suffix = isMobile ? "--mobile" : "";

    // Set initial styles for hero elements
    gsap.set(
      `#hero-caption${suffix}, #hero-marketing${suffix}, #hero-gurus${suffix}, #hero-description${suffix}, #hero-button${suffix}, #hero-marquee, #hero-male${suffix}, #hero-female${suffix}, #hero-cursor${suffix}`,
      {
        opacity: 0,
        y: isMobile ? "2rem" : "4rem",
      }
    );

    // Create a GSAP timeline for the hero animation
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: isMobile ? 0.8 : 1 },
      onComplete: animateInViewElements, // Call animateInViewElements after the hero animation
    });

    // Frame 1: Fade in and move up hero elements
    tl.to(
      `#hero-caption${suffix}, #hero-marketing${suffix}, #hero-gurus${suffix}, #hero-description${suffix}, #hero-button${suffix}, #hero-marquee, #hero-male${suffix}, #hero-female${suffix}, #hero-cursor${suffix}`,
      {
        opacity: 1,
        y: 0,
        stagger: isMobile ? 0.08 : 0.1,
      }
    )
      // Frame 2: Move cursor to the side
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
      // Frame 3: Scale down cursor
      .to(
        `#hero-cursor${suffix}`,
        { scale: 0.9, duration: 0.2, ease: "power2.in" },
        "-=0.15"
      )
      // Frame 4: Scale down caption
      .to(
        `#hero-caption${suffix}`,
        { scale: 0.95, duration: 0.2, ease: "power2.in" },
        "<"
      )
      // Frame 5: Scale up cursor
      .to(`#hero-cursor${suffix}`, {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.5)",
      })
      // Frame 6: Scale up caption
      .to(
        `#hero-caption${suffix}`,
        { scale: 1, duration: 0.45, ease: "elastic.out(1, 0.5)" },
        "-=0.2"
      )
      // Frame 7: Move cursor back to center
      .to(
        `#hero-cursor${suffix}`,
        { x: 0, y: 0, duration: 0.7, ease: "power2.inOut" },
        "-=0.3"
      );
  }

  // Run the hero animation based on device size
  if (isMobile()) {
    runHeroAnimation(true);
  } else if (isDesktop()) {
    runHeroAnimation(false);
  }
}

// ===== Event Listeners =====
// Add click event listener for internal links
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (link && link.href && link.href.startsWith(window.location.origin)) {
    e.preventDefault();
    handlePageTransition(link.href);
  }
});

// Add event listener for browser back/forward buttons
window.addEventListener("popstate", () => {
  pageTransitionOut().then(() => location.reload());
});

// ===== Initial Page Load Animation =====
// Function to handle the initial page load animation
const initialPageLoad = () => {
  // Set initial styles for the main content
  gsap.set("main", { opacity: 0, y: 50 });

  // Run the preloader animation
  const preloaderAnimation = animatePreloader();
  const totalDuration = preloaderAnimation.duration();

  // After the preloader animation completes
  preloaderAnimation.then(() => {
    // Show the main content wrapper
    gsap.set(".page--wrapper", { display: "block" });

    // Animate the page transition in
    pageTransitionIn().then(() => {
      // Show the main content
      showContent();

      // Initialize the hero intro animation
      initHeroIntro();
    });
  });
};

// Run the initial page load animation
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialPageLoad);
} else {
  initialPageLoad();
}

// ===== Prevent Flash of Unstyled Content =====
// Prevent a flash of unstyled content
document.addEventListener("DOMContentLoaded", () => {
  gsap.to("body", { opacity: 1, duration: 0 });
});

// ===== Page Transition Functions =====
// Function to animate the page transition out
const pageTransitionOut = () =>
  gsap.to(".page--transition", {
    yPercent: 0,
    duration: 0.8,
    ease: "expo.inOut",
    display: "block",
    onStart: () => {
      // Hide the log element during the transition
      document.querySelector(".log")?.classList.add("hidden");
    },
  });

// Function to animate the page transition in
const pageTransitionIn = () =>
  gsap.to(".page--transition", {
    yPercent: -100,
    duration: 0.8,
    ease: "expo.inOut",
    display: "none",
    onComplete: () => {
      // Show the log element after the transition
      document.querySelector(".log")?.classList.remove("hidden");
    },
  });

// Function to show the main content
const showContent = () =>
  gsap.fromTo(
    "main",
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.5)",
    }
  );

// Function to preload page
const preloadPage = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error ${response.status}`);
    }
    return response.url;
  } catch (error) {
    console.error("Preloading failed:", error);
    return url; // Fallback to normal navigation
  }
};

// Function to handle page transitions
const handlePageTransition = async (url) => {
  await pageTransitionOut();
  const responseURL = await preloadPage(url);

  // Hide transition content when navigating to the home page
  if (responseURL === window.location.origin + "/index.html") {
    gsap.set("main", { opacity: 0 });
  }

  window.location.href = responseURL;
};
