// Seamless Marquee
document.addEventListener("DOMContentLoaded", function () {
  const marqueeWrapper = document.querySelector(".marquee--w");
  const marqueeTrack = marqueeWrapper.querySelector(".marquee--track");
  const marqueeList = marqueeTrack.querySelector(".marquee--list-w");
  const marqueeItems = marqueeList.children;

  let totalWidth = 0;

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

      requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  // Initialize marquee
  function initMarquee() {
    calculateTotalWidth();
    cloneMarqueeItems();
    animateMarquee();
  }

  // Recalculate dimensions and restart animation on window resize
  window.addEventListener("resize", function () {
    marqueeTrack.style.transform = "translateX(0)"; // Reset position
    marqueeTrack.innerHTML = ""; // Clear previous clones
    marqueeTrack.appendChild(marqueeList); // Re-append the original list
    initMarquee();
  });

  initMarquee(); // Start the marquee
});
