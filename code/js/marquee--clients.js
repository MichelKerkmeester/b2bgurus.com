// Seamless Marquee
document.addEventListener("DOMContentLoaded", function () {
  const marqueeWrapper = document.querySelector(".marquee--w");
  const marqueeTrack = marqueeWrapper.querySelector(".marquee--track");
  const marqueeList = marqueeTrack.querySelector(".marquee--list-w");
  const marqueeItems = marqueeList.children;

  let totalWidth = 0;
  let animationId;
  let isDesktop = window.innerWidth >= 992;

  const desktopDuration = 20000;
  const mobileDuration = 15000;

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

  window.addEventListener("resize", debouncedHandleResize);

  initMarquee();
});
