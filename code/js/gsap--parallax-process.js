// Process
// GSAP Parallax
document.addEventListener("DOMContentLoaded", function () {
  // Function to detect if the user is on a desktop device
  function isDesktop() {
    return window.innerWidth >= 992;
  }

  if (isDesktop()) {
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
          start: "top 90%", // Start position of the animation based on scroll
          end: "bottom 20%", // End position of the animation based on scroll
          scrub: 3, // Smooth scrolling effect during the animation
        },
      };

      // Animate headings
      gsap.from(heading, {
        ...commonSettings,
        y: "6.25rem",
        opacity: 25,
        duration: 1,
        ease: "power2.out",
      });

      // Animate descriptions
      gsap.from(description, {
        ...commonSettings,
        y: "9.375rem",
        opacity: 25,
        duration: 1,
        delay: 0.25,
        ease: "power2.out",
        stagger: 0.1,
      });

      // Animation settings for illustrations based on the item's index
      const illustrationSettings = {
        1: {
          small: { x: "6.25rem", y: "-12.5rem", rotation: -30, scale: 0.5 },
          big: { x: "6.25rem", y: "-3.125rem", rotation: 30, scale: 0.75 },
        },
        2: {
          small: { x: "-9.375rem", y: "-6.25rem", rotation: 30, scale: 0.5 },
          big: { x: "-12.5rem", y: "-12.5rem", rotation: -15, scale: 0.75 },
        },
        3: {
          small: { x: "9.375rem", y: "-9.375rem", rotation: -25, scale: 0.5 },
          big: { x: "6.25rem", y: "-6.25rem", rotation: 25, scale: 0.75 },
        },
        4: {
          small: { x: "12.5rem", y: "-3.125rem", rotation: 45, scale: 0.5 },
          big: { x: "9.375rem", y: "-15.625rem", rotation: -25, scale: 0.75 },
        },
        5: {
          small: { x: "-9.375rem", y: "-6.25rem", rotation: -25, scale: 0.5 },
          big: { x: "-12.5rem", y: "-6.25rem", rotation: 25, scale: 0.75 },
        },
        6: {
          small: { x: "-6.25rem", y: "-6.25rem", rotation: -25, scale: 0.5 },
          big: { x: "6.25rem", y: "-6.25rem", rotation: 25, scale: 0.75 },
        },
      };

      // Animate small illustrations
      const smallSettings = illustrationSettings[index].small;
      gsap.from(smallIllustration, {
        ...commonSettings,
        ...smallSettings, // Apply specific animation settings based on the item index
        opacity: 0,
        duration: 3,
        ease: "power3.out",
        stagger: 0.2,
      });

      // Animate big illustrations
      const bigSettings = illustrationSettings[index].big;
      gsap.from(bigIllustration, {
        ...commonSettings,
        ...bigSettings, // Apply specific animation settings based on the item index
        opacity: 0,
        duration: 3,
        delay: 0.1,
        ease: "power3.out",
      });
    }
  }
});
