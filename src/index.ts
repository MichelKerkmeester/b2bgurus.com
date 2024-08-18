window.Webflow ||= [];
window.Webflow.push(() => {
  const name = "Michel Kerkmeester";
  console.log(`Staging is live - Dev by ${name}`);
});

// Function to detect if the user is on a desktop device
function isDesktop() {
  return window.innerWidth >= 992;
}

// Wait until all scripts/resources are loaded
window.addEventListener("load", function () {
  if (isDesktop()) {
    // Split text into individual <span> tags
    const splitText = (selector) => {
      const element = document.querySelector(selector);
      element.innerHTML = element.textContent
        .split("")
        .map((char) => `<span>${char}</span>`)
        .join("");
    };

    // Apply splitText to specific elements
    splitText("#hero-marketing");
    splitText("#hero-gurus");

    // Set initial styles for elements
    gsap.set(
      "#hero-caption span, #hero-marketing span, #hero-gurus span, #hero-description, #hero-button, #hero-marquee",
      {
        opacity: 0,
        y: "3.125rem",
      }
    );
    gsap.set("#hero-caption", { opacity: 0, y: "3.125rem" });
    gsap.set("#hero-male, #hero-female, #hero-cursor", {
      opacity: 0,
      scale: 0.5,
      y: "1.875rem",
    });

    // Create GSAP timeline for animations
    const tl = gsap.timeline({
      defaults: { ease: "power3.out", duration: 1 },
    });

    // Animate in view
    tl.to("#hero-caption", { opacity: 1, y: 0 })
      .to("#hero-caption span", { opacity: 1, y: 0, stagger: 0.03 }, "-=0.7")
      .to(
        "#hero-marketing span, #hero-gurus span",
        { opacity: 1, y: 0, stagger: 0.04 },
        "-=0.9"
      )
      .to(
        "#hero-male, #hero-cursor",
        {
          opacity: 1,
          scale: 1,
          y: 0,
          stagger: 0.2,
          ease: "elastic.out(1, 0.7)",
          onComplete: function (targets) {
            gsap.to(targets, {
              y: "-0.625rem",
              duration: 1.2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          },
        },
        "-=0.8"
      )
      .to(
        "#hero-female, #hero-description, #hero-button, #hero-marquee",
        { opacity: 1, scale: 1, y: 0, stagger: 0.1 },
        "-=0.8"
      )
      .to(
        "#hero-cursor",
        {
          x: "-1.875rem",
          y: "-1.875rem",
          duration: 0.5,
          ease: "power2.inOut",
        },
        "+=0.3"
      )
      .to(
        "#hero-cursor",
        { scale: 0.9, duration: 0.2, ease: "power2.in" },
        "-=0.15"
      )
      .to(
        "#hero-caption",
        { scale: 0.95, duration: 0.2, ease: "power2.in" },
        "<"
      )
      .to("#hero-cursor", { scale: 1, duration: 0.3, ease: "back.out(1.5)" })
      .to(
        "#hero-caption",
        { scale: 1, duration: 0.45, ease: "elastic.out(1, 0.5)" },
        "-=0.2"
      )
      .to(
        "#hero-cursor",
        { x: 0, y: 0, duration: 0.7, ease: "power2.inOut" },
        "-=0.3"
      );

    // Animate click
    const caption = document.querySelector("#hero-caption");
    caption.addEventListener("mousedown", () => {
      gsap.to("#hero-cursor", {
        scale: 0.9,
        duration: 0.15,
        ease: "power2.in",
      });
      gsap.to("#hero-caption", {
        scale: 0.95,
        duration: 0.15,
        ease: "power2.in",
      });
    });
    caption.addEventListener("mouseup", () => {
      gsap.to("#hero-cursor", {
        scale: 1,
        duration: 0.3,
        ease: "back.out(1.5)",
      });
      gsap.to("#hero-caption", {
        scale: 1,
        duration: 0.45,
        ease: "elastic.out(1, 0.5)",
      });
    });
  }
});
