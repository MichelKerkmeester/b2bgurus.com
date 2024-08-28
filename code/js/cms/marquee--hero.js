// CMS Marquee
function initializeMarquee() {
  const marqueeWrapper = document.querySelector(".marquee--w");
  const marqueeList = marqueeWrapper.querySelector(".marquee--list-w");

  // Configuration
  const desktopSpeed = 300; // pixels per second
  const mobileSpeed = 200; // pixels per second
  const mobileBreakpoint = 992;

  function setupMarquee() {
    const isDesktop = window.innerWidth >= mobileBreakpoint;
    const speed = isDesktop ? desktopSpeed : mobileSpeed;

    // Clear existing content and animation
    marqueeList.innerHTML = "";
    marqueeList.style.animation = "none";

    // Clone the original items
    const originalItems = Array.from(
      marqueeWrapper.querySelectorAll(".marquee--list-w > *")
    );
    originalItems.forEach((item) =>
      marqueeList.appendChild(item.cloneNode(true))
    );
    originalItems.forEach((item) =>
      marqueeList.appendChild(item.cloneNode(true))
    );

    // Calculate the total width
    const totalWidth = Array.from(marqueeList.children).reduce(
      (sum, item) => sum + item.offsetWidth,
      0
    );

    // Set up the CSS animation
    marqueeList.style.setProperty(
      "--marquee-duration",
      `${totalWidth / speed}s`
    );
    marqueeList.style.animation =
      "marquee var(--marquee-duration) linear infinite";

    // Add necessary styles
    marqueeWrapper.style.overflow = "hidden";
    marqueeList.style.display = "flex";
    marqueeList.style.width = "max-content";
  }

  function handleResize() {
    if (window.innerWidth >= mobileBreakpoint) {
      setupMarquee();
    }
  }

  // Debounce function
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const debouncedHandleResize = debounce(handleResize, 250);

  // Listen for window resize events only on desktop
  if (window.innerWidth >= mobileBreakpoint) {
    window.addEventListener("resize", debouncedHandleResize);
  }

  // Initialize the marquee
  setupMarquee();

  // Add the CSS animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes marquee {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(-50%);
      }
    }
  `;
  document.head.appendChild(style);
}

// Initialize marquee when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  initializeMarquee();
});

// Listen for preloader finished event (for home page)
document.addEventListener("preloaderFinished", function () {
  initializeMarquee();
});

// Listen for Barba.js page transitions
document.addEventListener("barba:transition", function () {
  initializeMarquee();
});
