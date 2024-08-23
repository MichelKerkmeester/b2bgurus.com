// Seamless Marquee
document.addEventListener("DOMContentLoaded", function () {
  const marqueeWrapper = document.querySelector(".marquee--w");
  const marqueeTrack = marqueeWrapper.querySelector(".marquee--track");
  const marqueeList = marqueeTrack.querySelector(".marquee--list-w");
  const marqueeItems = marqueeList.children;

  let totalWidth = 0;
  let animationId;
  let isDesktop = window.innerWidth >= 992;

  // Animation durations for desktop and mobile
  const desktopDuration = 20000; // 20 seconds
  const mobileDuration = 15000; // 15 seconds

  // Frame rate control variables
  let lastTimestamp = 0;
  const targetFPS = 60; // Target 60 frames per second
  const frameInterval = 1000 / targetFPS; // Milliseconds per frame

  function calculateTotalWidth() {
    totalWidth = 0;
    Array.from(marqueeItems).forEach((item) => {
      totalWidth += item.offsetWidth;
    });
  }

  function cloneMarqueeItems() {
    const clone = marqueeList.cloneNode(true);
    marqueeTrack.appendChild(clone);
  }

  function animateMarquee() {
    let startTime;
    const duration = isDesktop ? desktopDuration : mobileDuration;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;

      // Move the marquee track based on the calculated progress
      marqueeTrack.style.transform = `translateX(${-progress * totalWidth}px)`;

      animationId = requestAnimationFrame(step);
    }

    animationId = requestAnimationFrame(step);
  }

  function initMarquee() {
    calculateTotalWidth();
    cloneMarqueeItems();
    animateMarquee();
  }

  function handleResize() {
    const wasDesktop = isDesktop;
    isDesktop = window.innerWidth >= 992;

    // Only reinitialize if the device type has changed
    if (wasDesktop !== isDesktop) {
      cancelAnimationFrame(animationId);
      marqueeTrack.style.transform = "translateX(0)";
      marqueeTrack.innerHTML = "";
      marqueeTrack.appendChild(marqueeList);
      initMarquee();
    }
  }

  // Debounce function to limit the frequency of resize event handling
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

  // Listen for window resize events
  window.addEventListener("resize", debouncedHandleResize);

  // Initialize the marquee
  initMarquee();
});
