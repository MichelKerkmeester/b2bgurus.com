// Seamless Marquee
document.addEventListener("DOMContentLoaded", function () {
  const marqueeWrapper = document.querySelector(".marquee--w");
  const marqueeTrack = marqueeWrapper.querySelector(".marquee--track");
  const marqueeList = marqueeTrack.querySelector(".marquee--list-w");
  const marqueeItems = marqueeList.children;

  let totalWidth = 0;
  let animationId;
  let isDesktop = window.innerWidth >= 992;

  // Set different durations for desktop and mobile
  const desktopDuration = 20000; // 20 seconds for desktop
  const mobileDuration = 15000; // 15 seconds for mobile

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
    let duration = isDesktop ? desktopDuration : mobileDuration;

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
    isDesktop = window.innerWidth >= 992;
    cancelAnimationFrame(animationId);
    marqueeTrack.style.transform = "translateX(0)";
    marqueeTrack.innerHTML = "";
    marqueeTrack.appendChild(marqueeList);
    initMarquee();
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

  // Initialize marquee
  initMarquee();
});
