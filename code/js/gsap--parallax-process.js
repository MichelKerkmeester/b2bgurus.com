// Process
// GSAP Parallax
document.addEventListener("DOMContentLoaded", function () {
  function isDesktop() {
    return window.innerWidth >= 992; // Check if the device is a desktop
  }

  if (isDesktop()) {
    gsap.registerPlugin(ScrollTrigger);

    const processItems = document.querySelectorAll(
      ".process--list .w-dyn-item"
    );

    processItems.forEach((item, index) => {
      item.style.visibility = "visible"; // Ensure item is visible
      animateProcessItem(item, index + 1); // Animate each item based on its index
    });

    function animateProcessItem(item, index) {
      const heading = item.querySelector(".process--heading");
      const description = item.querySelector(".process--description");
      const smallIllustration = item.querySelector(
        `.illustration.cc--process-${index}--small`
      );
      const bigIllustration = item.querySelector(
        `.illustration.cc--process-${index}--big`
      );

      // Speed control: Adjust this value to control overall animation speed
      // Lower values = slower animation, Higher values = faster animation
      const speed = 0.75;

      const commonSettings = {
        scrollTrigger: {
          trigger: item, // Element that triggers the animation
          start: "top 90%",
          end: "bottom 20%",
          scrub: speed, // Use the speed variable here
        },
      };

      // Animate headings
      gsap.from(heading, {
        ...commonSettings,
        y: "6.25rem",
        opacity: 25,
        duration: 1,
        ease: "power2.out", // Smooth easing effect
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

      // Specific animation settings for illustrations based on item index
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
      gsap.from(smallIllustration, {
        ...commonSettings,
        ...illustrationSettings[index].small, // Apply small illustration settings
        opacity: 0,
        duration: 3,
        ease: "power3.out",
        stagger: 0.2,
      });

      // Animate big illustrations
      gsap.from(bigIllustration, {
        ...commonSettings,
        ...illustrationSettings[index].big, // Apply big illustration settings
        opacity: 0,
        duration: 3,
        delay: 0.1,
        ease: "power3.out",
      });
    }
  }
});
