window.Webflow ||= [];
window.Webflow.push(() => {
  const name = "Michel Kerkmeester";
});

window.addEventListener("load", function () {
  // Wait until all scripts/resources are loaded

  gsap.registerPlugin(ScrollTrigger);

  // Check if the screen width is 992px or above
  function isDesktop() {
    return window.innerWidth >= 992;
  }

  // Function to animate each process item with unique animations
  function animateProcessItem(item, index) {
    const heading = item.querySelector(".process--heading"); // Get heading element
    const description = item.querySelector(".process--description"); // Get description element
    const smallIllustration = item.querySelector(
      `.illustration.cc--process-${index}--small`
    ); // Get small illustration
    const bigIllustration = item.querySelector(
      `.illustration.cc--process-${index}--big`
    ); // Get big illustration

    // Animate heading
    if (heading) {
      gsap.fromTo(
        heading,
        { y: 100 }, // Start position
        {
          y: 0, // End position
          scrollTrigger: {
            trigger: item,
            start: "top 80%", // Start animation
            end: "bottom 20%", // End animation
            scrub: true, // Smooth scrubbing
          },
        }
      );
    }

    // Animate description
    if (description) {
      gsap.fromTo(
        description,
        { y: 150 }, // Start position
        {
          y: 0, // End position
          scrollTrigger: {
            trigger: item,
            start: "top 80%", // Start animation
            end: "bottom 20%", // End animation
            scrub: true, // Smooth scrubbing
          },
        }
      );
    }

    // Animate small illustration with unique settings
    if (smallIllustration) {
      let smallAnim = {};
      switch (index) {
        case 1:
          smallAnim = { y: 300, rotation: -60, scale: 0.6 }; // Process 1 small
          break;
        case 2:
          smallAnim = { y: 250, rotation: -50, scale: 0.7 }; // Process 2 small
          break;
        case 3:
          smallAnim = { y: 200, rotation: -40, scale: 0.8 }; // Process 3 small
          break;
        case 4:
          smallAnim = { y: 150, rotation: -30, scale: 0.9 }; // Process 4 small
          break;
        case 5:
          smallAnim = { y: 100, rotation: -20, scale: 1.0 }; // Process 5 small
          break;
        case 6:
          smallAnim = { y: 50, rotation: -10, scale: 1.1 }; // Process 6 small
          break;
      }
      gsap.fromTo(
        smallIllustration,
        smallAnim, // Start position
        {
          y: 0,
          rotation: 0,
          scale: 1, // End position
          scrollTrigger: {
            trigger: item,
            start: "top 80%", // Start animation
            end: "bottom 20%", // End animation
            scrub: true, // Smooth scrubbing
          },
        }
      );
    }

    // Animate big illustration with unique settings
    if (bigIllustration) {
      let bigAnim = {};
      switch (index) {
        case 1:
          bigAnim = { y: 300, rotation: 60, scale: 0.6 }; // Process 1 big
          break;
        case 2:
          bigAnim = { y: 250, rotation: 50, scale: 0.7 }; // Process 2 big
          break;
        case 3:
          bigAnim = { y: 200, rotation: 40, scale: 0.8 }; // Process 3 big
          break;
        case 4:
          bigAnim = { y: 150, rotation: 30, scale: 0.9 }; // Process 4 big
          break;
        case 5:
          bigAnim = { y: 100, rotation: 20, scale: 1.0 }; // Process 5 big
          break;
        case 6:
          bigAnim = { y: 50, rotation: 10, scale: 1.1 }; // Process 6 big
          break;
      }
      gsap.fromTo(
        bigIllustration,
        bigAnim, // Start position
        {
          y: 0,
          rotation: 0,
          scale: 1, // End position
          scrollTrigger: {
            trigger: item,
            start: "top 80%", // Start animation
            end: "bottom 20%", // End animation
            scrub: true, // Smooth scrubbing
          },
        }
      );
    }
  }

  // Select all process items
  const processItems = document.querySelectorAll(".process--list .w-dyn-item");

  // Ensure initial visibility and apply animation to each process item if screen width is 992px or above
  if (isDesktop()) {
    processItems.forEach((item, index) => {
      item.style.visibility = "visible"; // Ensure visibility
      animateProcessItem(item, index + 1); // Unique class names
    });
  }

  // Add a resize event listener to apply animations dynamically
  window.addEventListener("resize", () => {
    if (isDesktop()) {
      processItems.forEach((item, index) => {
        item.style.visibility = "visible"; // Ensure visibility
        animateProcessItem(item, index + 1); // Unique class names
      });
    } else {
      processItems.forEach((item) => {
        gsap.killTweensOf(
          item.querySelectorAll(
            ".process--heading, .process--description, .illustration"
          )
        );
        item.style.visibility = ""; // Reset visibility
      });
    }
  });
});
