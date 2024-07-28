window.addEventListener("load", function () {
  // Wait until all scripts/resources are loaded
  const marqueeTrack = document.querySelector(".marquee--track"); // Select marquee track
  const items = Array.from(marqueeTrack.children); // Get all child items

  // Durations for desktop and mobile (in seconds)
  const desktopDuration = 40,
    mobileDuration = 45;

  // Device detection, including tablets
  const isMobile =
    /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const isTablet =
    /iPad/.test(navigator.userAgent) ||
    (navigator.userAgent.includes("Mac") && "ontouchend" in document);

  let gsapAnimation; // Variable to store GSAP animation

  // Clone items for smooth loop
  function cloneItems() {
    const fragment = document.createDocumentFragment();
    items.forEach((item) => fragment.appendChild(item.cloneNode(true))); // Clone each item
    marqueeTrack.appendChild(fragment); // Append clones
  }

  // Preload images before starting animation
  function preloadImages() {
    return Promise.all(
      Array.from(marqueeTrack.querySelectorAll("img")).map((img) => {
        return img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.onload = img.onerror = resolve;
            });
      })
    );
  }

  // GSAP animation for desktop
  function createDesktopAnimation() {
    if (gsapAnimation) gsapAnimation.kill(); // Kill existing animation if any

    const totalWidth = items.reduce((acc, item) => acc + item.offsetWidth, 0); // Total width of items
    gsap.set(marqueeTrack, { x: 0 }); // Set initial position
    gsapAnimation = gsap.to(marqueeTrack, {
      x: -totalWidth,
      duration: desktopDuration,
      ease: "none",
      repeat: -1, // Loop indefinitely
      modifiers: {
        x: gsap.utils.unitize((value) => parseFloat(value) % totalWidth), // Wrap around at the end
      },
    });
  }

  // CSS animation for mobile/tablets
  function createMobileAnimation() {
    const totalWidth = items.reduce((acc, item) => acc + item.offsetWidth, 0); // Total width
    marqueeTrack.style.setProperty("--marquee-duration", `${mobileDuration}s`); // Animation duration
    marqueeTrack.style.setProperty("--marquee-width", `${totalWidth}px`); // Set total width
    marqueeTrack.classList.add("marquee-animate"); // Start CSS animation
  }

  // Handle window resize
  const handleResize = debounce(() => {
    if (isMobile || isTablet) {
      createMobileAnimation(); // Mobile animation
    } else {
      createDesktopAnimation(); // Desktop animation
    }
  }, 250);

  // Debounce function to limit resize calls
  function debounce(func, wait) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait); // Run function after wait
    };
  }

  // Initialize marquee
  async function initMarquee() {
    cloneItems(); // Clone items
    await preloadImages(); // Wait for images to load
    if (isMobile || isTablet) {
      createMobileAnimation(); // Mobile/tablet animation
    } else {
      createDesktopAnimation(); // Desktop animation
    }
    window.addEventListener("resize", handleResize); // Resize event
  }

  // Intersection Observer for scroll-based activation
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (isMobile || isTablet) {
          marqueeTrack.style.animationPlayState = entry.isIntersecting
            ? "running"
            : "paused"; // Pause/resume animation
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(marqueeTrack.parentElement); // Observe parent

  initMarquee(); // Start marquee
});
