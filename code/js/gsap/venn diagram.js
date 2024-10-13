// Venn Diagram
// Animate in view
function animateVennDiagram() {
  gsap.registerPlugin(ScrollTrigger);

  const isMobileOrTablet = window.innerWidth < 992;
  const suffix = isMobileOrTablet ? "--mobile" : "";

  const diagramElements = [
    `#diagram-heading${suffix}`,
    `#diagram-image${suffix}`,
    `#diagram-subtitle${suffix}`,
    `#diagram-description${suffix}`,
  ];

  // Iterate through each diagram element
  diagramElements.forEach((selector, index) => {
    // Find the element in the DOM
    const element = document.querySelector(selector);
    if (!element) {
      console.warn(`Diagram element ${selector} not found`);
      return;
    }

    // Set initial state: hidden and slightly below its final position
    gsap.set(element, {
      opacity: 0,
      y: isMobileOrTablet ? "10vh" : "8vh",
    });

    // Animate the element into view
    gsap.to(element, {
      opacity: 1,
      y: 0,
      duration: isMobileOrTablet ? 0.8 : 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 70%",
        end: "bottom 40%",
        toggleActions: "play none none none",
      },
    });
  });
}

document.addEventListener("DOMContentLoaded", animateVennDiagram);
