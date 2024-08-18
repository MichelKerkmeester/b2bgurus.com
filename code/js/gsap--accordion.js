// GSAP Accordion
document.addEventListener("DOMContentLoaded", function () {
  const accordions = document.querySelectorAll(".accordion--list-item"); // Select all accordion items
  let lastHoveredHeader = null; // Track the last hovered header
  let openAccordionHeader = null; // Track the currently open accordion header

  // Function to check if the device is mobile/tablet
  function isMobileOrTablet() {
    return window.innerWidth <= 991; // Breakpoint for tablets and below
  }

  // Loop through each accordion item
  accordions.forEach((accordion) => {
    const header = accordion.querySelector(".accordion--header"); // Select the header
    const content = accordion.querySelector(".accordion--content"); // Select the content
    const divider = header.querySelector(".accordion--divider"); // Select the divider
    const accordionNr = header.querySelector(".accordion--nr"); // Select the accordion number
    const btnLine1 = header.querySelector(".accordion--btn-line-1"); // Select the first line of the button
    const btnLine2 = header.querySelector(".accordion--btn-line-2"); // Select the second line of the button

    // Set the initial state for content (collapsed)
    gsap.set(content, {
      height: "0px",
      opacity: 0,
      scale: 0.95,
      y: 10,
      overflow: "hidden",
    });

    // Function to handle color change on hover
    const handleHoverColorChange = (nrElement, btn1, btn2, isIn) => {
      gsap.killTweensOf([nrElement, btn1, btn2]); // Kill ongoing animations
      gsap.to(nrElement, {
        color: isIn ? "#2f7f90" : "#c4c4c4",
        duration: 0.5,
        ease: "power1.out",
      }); // Animate text color change
      gsap.to([btn1, btn2], {
        backgroundColor: isIn ? "#2f7f90" : "#13333a",
        duration: 0.5,
        ease: "power1.out",
      }); // Animate background color change
    };

    // Function to handle line animation on click
    const handleLineClick = (line, isOpen) => {
      gsap.killTweensOf(line); // Kill ongoing animations
      gsap.to(line, {
        width: isOpen ? "100%" : "0%",
        duration: 0.5,
        ease: "power1.out",
      }); // Animate line width
    };

    // Add hover animations if not on mobile/tablet
    if (!isMobileOrTablet()) {
      header.addEventListener("mouseenter", () => {
        // Hover on header
        if (header !== openAccordionHeader) {
          lastHoveredHeader = header; // Update last hovered header
          handleHoverColorChange(accordionNr, btnLine1, btnLine2, true); // Change text and button colors on hover
        }
      });

      header.addEventListener("mouseleave", () => {
        // Hover off header
        if (lastHoveredHeader === header && openAccordionHeader !== header) {
          handleHoverColorChange(accordionNr, btnLine1, btnLine2, false); // Reset text and button colors on hover out
          lastHoveredHeader = null; // Reset last hovered header
        }
      });
    }

    // Click event for the accordion header
    header.addEventListener("click", () => {
      const isOpen = parseFloat(gsap.getProperty(content, "height")) > 0; // Check if content is open

      // Disable scroll handling
      window.disableScrollHandling();

      // Close all other accordion contents
      accordions.forEach((item) => {
        const itemContent = item.querySelector(".accordion--content");
        const itemHeader = item.querySelector(".accordion--header");
        const itemDivider = itemHeader.querySelector(".accordion--divider");
        const itemNr = itemHeader.querySelector(".accordion--nr");
        const itemBtnLine1 = itemHeader.querySelector(".accordion--btn-line-1");
        const itemBtnLine2 = itemHeader.querySelector(".accordion--btn-line-2");

        if (itemContent !== content) {
          gsap.to(itemContent, {
            height: "0px",
            opacity: 0,
            scale: 0.95,
            y: 10,
            duration: 0.5,
            ease: "power1.inOut",
            onComplete: () => {
              gsap.set(itemContent, { height: "0px" }); // Ensure height is 0px after closing
            },
          }); // Close other contents

          gsap.to(itemDivider, {
            width: "0%",
            duration: 0.5,
            ease: "power1.out",
          }); // Close divider line

          gsap.to(itemNr, {
            color: "#c4c4c4",
            duration: 0.5,
            ease: "power1.inOut",
          }); // Reset number color

          // Close button animation
          gsap.to(itemBtnLine1, {
            rotation: 0,
            duration: 0.75,
            ease: "expo.out",
          }); // Rotate line 1 to 0 degrees
          gsap.to([itemBtnLine1, itemBtnLine2], {
            backgroundColor: "#13333a",
            duration: 0.75,
            delay: 0.25,
            ease: "ease.out",
          }); // Change BG color of button lines
        }
      });

      if (!isOpen) {
        // Open the clicked content if not already open
        gsap.to(content, {
          height: "auto",
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: "power1.out",
          onComplete: () => {
            gsap.set(content, { height: "auto" }); // Ensure height is auto after opening
            if (isMobileOrTablet()) {
              header.scrollIntoView({ behavior: "smooth", block: "start" });
              setTimeout(() => {
                window.scrollBy(0, -32); // Add padding (32px)
              }, 300); // Delay to ensure scrollIntoView completes first
            }
            // Enable scroll handling after animation
            setTimeout(window.enableScrollHandling, 1000); // Re-enable scroll handling after 1 second

            // Hide navigation when accordion is opened
            if (isMobileOrTablet()) {
              gsap.to(navHeader, {
                y: -navHeader.offsetHeight,
                duration: 0.8,
                ease: "power2.out",
              });
            }
          },
        });

        gsap.to(divider, {
          width: "100%",
          duration: 0.5,
          ease: "power1.out",
        }); // Animate divider line on open

        gsap.to(accordionNr, {
          color: "#2f7f90",
          duration: 0.5,
          ease: "power1.inOut",
        }); // Change number color on open

        openAccordionHeader = header; // Set the opened accordion header

        // Open button animation
        gsap.to(btnLine1, {
          rotation: -90,
          duration: 1,
          ease: "bounce.out",
        }); // Rotate line 1 to -90 degrees
        gsap.to([btnLine1, btnLine2], {
          backgroundColor: "#2f7f90",
          duration: 1.5,
          delay: 0.25,
          ease: "bounce.out",
        }); // Change BG color of button lines
      } else {
        // Close the clicked content if already open
        gsap.to(content, {
          height: "0px",
          opacity: 0,
          scale: 0.95,
          y: 10,
          duration: 0.5,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.set(content, { height: "0px" }); // Ensure height is 0px after closing
            gsap.to(divider, {
              width: "0%",
              duration: 0.5,
              ease: "power1.out",
            }); // Close divider line
            gsap.to(accordionNr, {
              color: "#c4c4c4",
              duration: 0.5,
              ease: "power1.inOut",
            }); // Reset number color on close
            // Enable scroll handling after animation
            setTimeout(window.enableScrollHandling, 1000); // Re-enable scroll handling after 1 second
          },
        });

        openAccordionHeader = null; // Reset the opened accordion header

        // Close button animation
        gsap.to(btnLine1, { rotation: 0, duration: 0.75, ease: "expo.out" }); // Rotate line 1 to 0 degrees
        gsap.to([btnLine1, btnLine2], {
          backgroundColor: "#13333a",
          duration: 0.75,
          delay: 0.25,
          ease: "ease.out",
        }); // Change BG color of button lines
      }
    });
  });
});