// Function to detect if the user is on a desktop device
function isDesktop() {
  return window.innerWidth >= 992; // Screen width in pixels to detect desktop devices
}

window.addEventListener("load", function () {
  if (isDesktop()) {
    // Wait until all scripts/resources are loaded
    gsap.registerPlugin(ScrollTrigger);

    // Select all process items that need animations
    const processItems = document.querySelectorAll(
      ".process--list .w-dyn-item"
    );

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
        y: "6.25rem", // 100px = 6.25rem
        opacity: 0, // Initial transparency level
        duration: 1, // Duration of the animation
        ease: "power2.out", // Smooth easing for a natural deceleration
      });

      // Animate the description with a smooth easing and stagger effect
      gsap.from(description, {
        ...commonSettings,
        y: "9.375rem", // 150px = 9.375rem
        opacity: 0, // Initial transparency level
        duration: 1, // Duration of the animation
        delay: 0.25, // Delay before the animation starts
        ease: "power2.out", // Smooth easing for a natural deceleration
        stagger: 0.1, // Stagger effect between animations
      });

      // Define animation settings for illustrations based on the item's index
      const illustrationSettings = {
        1: {
          small: { x: "6.25rem", y: "-12.5rem", rotation: -30, scale: 0.5 }, // 100px = 6.25rem, 200px = 12.5rem
          big: { x: "6.25rem", y: "-3.125rem", rotation: 30, scale: 0.75 }, // 100px = 6.25rem, 50px = 3.125rem
        },
        2: {
          small: { x: "-9.375rem", y: "-6.25rem", rotation: 30, scale: 0.5 }, // 150px = 9.375rem, 100px = 6.25rem
          big: { x: "-12.5rem", y: "-12.5rem", rotation: -15, scale: 0.75 }, // 200px = 12.5rem, 200px = 12.5rem
        },
        3: {
          small: { x: "9.375rem", y: "-9.375rem", rotation: -25, scale: 0.5 }, // 150px = 9.375rem, 150px = 9.375rem
          big: { x: "6.25rem", y: "-6.25rem", rotation: 25, scale: 0.75 }, // 100px = 6.25rem, 100px = 6.25rem
        },
        4: {
          small: { x: "12.5rem", y: "-3.125rem", rotation: 45, scale: 0.5 }, // 200px = 12.5rem, 50px = 3.125rem
          big: { x: "9.375rem", y: "-15.625rem", rotation: -25, scale: 0.75 }, // 150px = 9.375rem, 250px = 15.625rem
        },
        5: {
          small: { x: "-9.375rem", y: "-6.25rem", rotation: -25, scale: 0.5 }, // 150px = 9.375rem, 100px = 6.25rem
          big: { x: "-12.5rem", y: "-6.25rem", rotation: 25, scale: 0.75 }, // 200px = 12.5rem, 100px = 6.25rem
        },
        6: {
          small: { x: "-6.25rem", y: "-6.25rem", rotation: -25, scale: 0.5 }, // 100px = 6.25rem, 100px = 6.25rem
          big: { x: "6.25rem", y: "-6.25rem", rotation: 25, scale: 0.75 }, // 100px = 6.25rem, 100px = 6.25rem
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
  }
});
