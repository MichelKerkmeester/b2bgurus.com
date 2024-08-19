// Seamless Marquee
document.addEventListener("DOMContentLoaded", function () {
  const marqueeWrapper = document.querySelector(".marquee--w");
  const marqueeTrack = marqueeWrapper.querySelector(".marquee--track");
  const marqueeList = marqueeTrack.querySelector(".marquee--list-w");
  const marqueeItems = marqueeList.children;

  let totalWidth = 0;
  let animationId;
  let isDesktop = window.innerWidth >= 992;

  // Calculate the total width of the marquee items
  function calculateTotalWidth() {
    totalWidth = 0;
    Array.from(marqueeItems).forEach((item) => {
      totalWidth += item.offsetWidth;
    });
  }

  // Clone the items to create a seamless loop
  function cloneMarqueeItems() {
    const clone = marqueeList.cloneNode(true);
    marqueeTrack.appendChild(clone);
  }

  // Animate the marquee
  function animateMarquee() {
    let startTime;
    let duration = 20000; // Adjust duration for speed

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      const progress = (elapsed % duration) / duration;
      marqueeTrack.style.transform = `translateX(${-progress * totalWidth}px)`;

      animationId = requestAnimationFrame(step);
    }

    animationId = requestAnimationFrame(step);
  }

  // Initialize marquee
  function initMarquee() {
    calculateTotalWidth();
    cloneMarqueeItems();
    animateMarquee();
  }

  // Function to handle resize events
  function handleResize() {
    const newIsDesktop = window.innerWidth >= 992;

    if (newIsDesktop !== isDesktop) {
      isDesktop = newIsDesktop;

      if (isDesktop) {
        // Reinitialize marquee for desktop
        cancelAnimationFrame(animationId);
        marqueeTrack.style.transform = "translateX(0)";
        marqueeTrack.innerHTML = "";
        marqueeTrack.appendChild(marqueeList);
        initMarquee();
      } else {
        // Stop animation and reset for mobile
        cancelAnimationFrame(animationId);
        marqueeTrack.style.transform = "translateX(0)";
        marqueeTrack.innerHTML = "";
        marqueeTrack.appendChild(marqueeList);
      }
    } else if (isDesktop) {
      // Only recalculate and reinitialize on desktop
      cancelAnimationFrame(animationId);
      marqueeTrack.style.transform = "translateX(0)";
      marqueeTrack.innerHTML = "";
      marqueeTrack.appendChild(marqueeList);
      initMarquee();
    }
  }

  // Debounce function to limit the rate of function calls
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

  // Use debounced version of handleResize
  const debouncedHandleResize = debounce(handleResize, 250);

  // Add event listener for window resize
  window.addEventListener("resize", debouncedHandleResize);

  // Initial setup
  if (isDesktop) {
    initMarquee();
  }
});
