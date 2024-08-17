window.addEventListener("load", function () {
  // Wait until all scripts/resources are loaded
  gsap.registerPlugin(ScrollTrigger);

  // Select all process items that need animations
  const processItems = document.querySelectorAll(".process--list .w-dyn-item");

  // Animate each process item
  processItems.forEach((item, index) => {
    item.style.visibility = "visible"; // Ensure the item is visible
    animateProcessItem(item, index + 1); // Animate the item based on its index
  });

  // Function to animate each process item
  function animateProcessItem(item, index) {
    // Select the heading, description, and illustrations within the item
    const heading = item.querySelector(".process--heading");
    const description = item.querySelector(".process--description");
    const smallIllustration = item.querySelector(
      `.illustration.cc--process-${index}--small`
    );
    const bigIllustration = item.querySelector(
      `.illustration.cc--process-${index}--big`
    );

    // Common settings for all animations within this item
    const commonSettings = {
      scrollTrigger: {
        trigger: item, // Element that triggers the animation
        start: "top 99%", // Start position of the animation based on scroll
        end: "bottom 15%", // End position of the animation based on scroll
        scrub: 0.5, // Smooth scrolling effect during the animation
      },
    };

    // Animate the heading with a smooth easing and stagger effect
    gsap.from(heading, {
      ...commonSettings,
      y: 100, // Initial vertical offset for the heading
      opacity: 0, // Initial transparency level
      duration: 1, // Duration of the animation
      ease: "power2.out", // Smooth easing for a natural deceleration
    });

    // Animate the description with a smooth easing and stagger effect
    gsap.from(description, {
      ...commonSettings,
      y: 150, // Initial vertical offset for the description
      opacity: 0, // Initial transparency level
      duration: 1, // Duration of the animation
      delay: 0.25, // Delay before the animation starts
      ease: "power2.out", // Smooth easing for a natural deceleration
      stagger: 0.1, // Stagger effect between animations
    });

    // Define animation settings for illustrations based on the item's index
    const illustrationSettings = {
      1: {
        small: { x: 100, y: -200, rotation: -30, scale: 0.5 },
        big: { x: 100, y: -50, rotation: 30, scale: 0.75 },
      },
      2: {
        small: { x: -150, y: -100, rotation: 30, scale: 0.5 },
        big: { x: -200, y: -200, rotation: -15, scale: 0.75 },
      },
      3: {
        small: { x: 150, y: -150, rotation: -25, scale: 0.5 },
        big: { x: 100, y: -100, rotation: 25, scale: 0.75 },
      },
      4: {
        small: { x: 200, y: -50, rotation: 45, scale: 0.5 },
        big: { x: 150, y: -250, rotation: -25, scale: 0.75 },
      },
      5: {
        small: { x: -150, y: -100, rotation: -25, scale: 0.5 },
        big: { x: -200, y: -100, rotation: 25, scale: 0.75 },
      },
      6: {
        small: { x: -100, y: -100, rotation: -25, scale: 0.5 },
        big: { x: 100, y: -100, rotation: 25, scale: 0.75 },
      },
    };

    // Animate the small illustration with a smooth easing and stagger effect
    const smallSettings = illustrationSettings[index].small;
    gsap.from(smallIllustration, {
      ...commonSettings,
      ...smallSettings, // Apply specific animation settings based on the item index
      opacity: 0, // Initial transparency level
      duration: 3, // Duration of the animation
      ease: "power3.out", // Smooth easing for more pronounced acceleration and deceleration
      stagger: 0.2, // Stagger effect between animations
    });

    // Animate the big illustration with a smooth easing and stagger effect
    const bigSettings = illustrationSettings[index].big;
    gsap.from(bigIllustration, {
      ...commonSettings,
      ...bigSettings, // Apply specific animation settings based on the item index
      opacity: 0, // Initial transparency level
      duration: 3, // Duration of the animation
      delay: 0.1, // Delay before the animation starts
      ease: "power3.out", // Smooth easing for more pronounced acceleration and deceleration
    });
  }
});
