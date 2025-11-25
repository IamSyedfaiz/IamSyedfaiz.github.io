//
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  slidesPerView: 5,
  loop: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  speed: 8000, // Speed of the transition between slides
  allowTouchMove: false,
  breakpoints: {
    0: {
      slidesPerView: 1.5, // Mobile
    },
    640: {
      slidesPerView: 3, // Tablet
    },
    1024: {
      slidesPerView: 5, // Laptop/Desktop
    },
  },
});
// JavaScript for toggling dark mode with persistence
const toggleButton = document.getElementById("darkModeToggle");
const bodyElement = document.body;

if (localStorage.getItem("dark-mode") === "true") {
  bodyElement.classList.add("dark");
}

toggleButton.addEventListener("click", () => {
  bodyElement.classList.toggle("dark");
  localStorage.setItem("dark-mode", bodyElement.classList.contains("dark"));
});

const items = document.querySelectorAll(".drag-item");

items.forEach((item) => {
  let originX = item.offsetLeft;
  let originY = item.offsetTop;

  let isDragging = false;
  let startX, startY;

  // smooth animation
  item.style.transition = "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)";
  item.style.transform = "translate(0px, 0px)";

  item.addEventListener("mousedown", (e) => {
    isDragging = true;
    item.style.transition = "none";

    startX = e.clientX;
    startY = e.clientY;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const moveX = e.clientX - startX;
    const moveY = e.clientY - startY;

    // magnetic slow effect
    item.style.transform = `translate(${moveX * 0.7}px, ${moveY * 0.7}px)`;
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;

    isDragging = false;

    // enable smooth animation again
    item.style.transition = "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)";

    // snap back to original position
    item.style.transform = `translate(0px, 0px)`;
  });
});
// scroll
document.addEventListener("DOMContentLoaded", () => {
  const scroller = new LocomotiveScroll({
    el: document.querySelector("[data-scroll-container]"),
    smooth: true,
  });

  gsap.registerPlugin(ScrollTrigger);

  scroller.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(".container2", {
    scrollTop(value) {
      return arguments.length
        ? scroller.scrollTo(value, 0, 0)
        : scroller.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector(".container2").style.transform
      ? "transform"
      : "fixed",
  });

  gsap.to(".pin-wrap", {
    x: () =>
      -(document.querySelector(".pin-wrap").scrollWidth - window.innerWidth) +
      "px",
    ease: "none",
    scrollTrigger: {
      trigger: "#sectionPin",
      start: "top top",
      end: () => "+=" + document.querySelector(".pin-wrap").scrollWidth,
      pin: true,
      scrub: true,
      scroller: ".container2",
    },
  });

  ScrollTrigger.addEventListener("refresh", () => scroller.update());
  ScrollTrigger.refresh();
});
// scroll

// btn
//
document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".view-resume-btn");
  const finger = document.querySelector(".finger-overlay");
  const cells = document.querySelectorAll(".grid-cell");

  // Initial state: Hidden off to the side (bottom-left)
  // We use a class or direct style. Let's use a variable to track if we are hovering.
  let isHovering = false;

  // Function to set the "hidden" pose
  const setHiddenPose = () => {
    // Move down and left, rotate away
    finger.style.transform = `translate(-80px, 100px) rotate(-45deg)`;
    finger.classList.remove("opacity-100");
    finger.classList.add("opacity-0");
  };

  // Set initial pose
  setHiddenPose();

  button.addEventListener("mouseenter", () => {
    isHovering = true;
    finger.classList.remove("opacity-0");
    finger.classList.add("opacity-100");

    // On enter, we might not be over a specific cell yet, or we are over the first one.
    // The grid listeners will handle the specific position.
    // But if we enter from a side not covered by a cell (unlikely with the layout),
    // we want it to at least appear.
  });

  button.addEventListener("mouseleave", () => {
    isHovering = false;
    setHiddenPose();
  });

  // Grid snapping logic
  cells.forEach((cell) => {
    cell.addEventListener("mouseenter", (e) => {
      if (!isHovering) return;

      const rect = cell.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      // Calculate center of the cell relative to the button
      const cellCenterX = rect.left + rect.width / 2 - buttonRect.left;
      const cellCenterY = rect.top + rect.height / 2 - buttonRect.top;

      // Offset for the finger to look natural (tip at center)
      const offsetX = -50; // Center horizontally (width is 100)
      const offsetY = -20; // Offset so the tip is near the center

      finger.style.transform = `translate(${cellCenterX + offsetX}px, ${
        cellCenterY + offsetY
      }px) rotate(-10deg)`;
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const button = document.querySelector(".view-resume-btn-two");
  const finger = document.querySelector(".finger-overlay-two");
  const cells = document.querySelectorAll(".grid-cell-two");

  // Initial state: Hidden off to the side (bottom-left)
  // We use a class or direct style. Let's use a variable to track if we are hovering.
  let isHovering = false;

  // Function to set the "hidden" pose
  const setHiddenPose = () => {
    // Move down and left, rotate away
    finger.style.transform = `translate(-80px, 100px) rotate(-45deg)`;
    finger.classList.remove("opacity-100");
    finger.classList.add("opacity-0");
  };

  // Set initial pose
  setHiddenPose();

  button.addEventListener("mouseenter", () => {
    isHovering = true;
    finger.classList.remove("opacity-0");
    finger.classList.add("opacity-100");

    // On enter, we might not be over a specific cell yet, or we are over the first one.
    // The grid listeners will handle the specific position.
    // But if we enter from a side not covered by a cell (unlikely with the layout),
    // we want it to at least appear.
  });

  button.addEventListener("mouseleave", () => {
    isHovering = false;
    setHiddenPose();
  });

  // Grid snapping logic
  cells.forEach((cell) => {
    cell.addEventListener("mouseenter", (e) => {
      if (!isHovering) return;

      const rect = cell.getBoundingClientRect();
      const buttonRect = button.getBoundingClientRect();

      // Calculate center of the cell relative to the button
      const cellCenterX = rect.left + rect.width / 2 - buttonRect.left;
      const cellCenterY = rect.top + rect.height / 2 - buttonRect.top;

      // Offset for the finger to look natural (tip at center)
      const offsetX = -50; // Center horizontally (width is 100)
      const offsetY = -20; // Offset so the tip is near the center

      finger.style.transform = `translate(${cellCenterX + offsetX}px, ${
        cellCenterY + offsetY
      }px) rotate(-10deg)`;
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".wa-button");

  buttons.forEach((button) => {
    const finger = button.querySelector(".finger-overlay");
    const cells = button.querySelectorAll(".grid-cell");

    const hideFinger = () => {
      finger.style.transform = `translate(-80px, 100px) rotate(-45deg)`;
      finger.style.opacity = "0";
    };

    hideFinger();

    button.addEventListener("mouseenter", () => {
      finger.style.opacity = "1";
    });

    button.addEventListener("mouseleave", hideFinger);

    cells.forEach((cell) => {
      cell.addEventListener("mouseenter", () => {
        const rect = cell.getBoundingClientRect();
        const btnRect = button.getBoundingClientRect();

        const centerX = rect.left + rect.width / 2 - btnRect.left;
        const centerY = rect.top + rect.height / 2 - btnRect.top;

        const offsetX = -50;
        const offsetY = -20;

        finger.style.transform = `translate(${centerX + offsetX}px, ${
          centerY + offsetY
        }px) rotate(-10deg)`;
      });
    });
  });
});
