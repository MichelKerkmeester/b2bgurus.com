// Global
// Page Transition

// Initial setup
gsap.set(".page--transition", { yPercent: 0, display: "block" });

const pageTransitionOut = () =>
  gsap.to(".page--transition", {
    yPercent: 0,
    duration: 0.8,
    ease: "expo.inOut",
    display: "block",
    onStart: () => {
      document.querySelector(".log").classList.add("hidden");
    },
  });

const pageTransitionIn = () =>
  gsap.to(".page--transition", {
    yPercent: -100,
    duration: 0.8,
    ease: "expo.inOut",
    display: "none",
    onComplete: () => {
      document.querySelector(".log").classList.remove("hidden");
    },
  });

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

// Add click event listeners to all internal links
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (link && link.href && link.href.startsWith(window.location.origin)) {
    e.preventDefault();
    handlePageTransition(link.href);
  }
});

// Handle browser back/forward buttons
window.addEventListener("popstate", () => {
  pageTransitionOut().then(() => location.reload());
});

// Initial page load animation
const initialPageLoad = () => {
  gsap.set("main", { opacity: 0, y: 50 });
  pageTransitionIn().then(() => showContent());
};

// Run initial page load animation
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initialPageLoad);
} else {
  initialPageLoad();
}

// Prevent flash of unstyled content
document.addEventListener("DOMContentLoaded", () => {
  gsap.to("body", { opacity: 1, duration: 0 });
});
