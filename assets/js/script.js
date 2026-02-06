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
var swiper = new Swiper(".mySwiperAbout", {
  spaceBetween: 30,
  slidesPerView: 4,
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
      slidesPerView: 4, // Laptop/Desktop
    },
  },
});
// JavaScript for toggling dark mode with persistence
// const toggleButton = document.getElementById("darkModeToggle");
// const bodyElement = document.body;

// if (localStorage.getItem("dark-mode") === "true") {
//   bodyElement.classList.add("dark");
// }

// toggleButton.addEventListener("click", () => {
//   bodyElement.classList.toggle("dark");
//   localStorage.setItem("dark-mode", bodyElement.classList.contains("dark"));
//   setTimeout(() => {
//     window.location.reload();
//   }, 150);
// });
const bodyElement = document.body;
const toggleButtons = document.querySelectorAll(
  "#darkModeToggle, #darkModeToggleMobile",
);

// Apply saved theme on load
if (localStorage.getItem("dark-mode") === "true") {
  bodyElement.classList.add("dark");
}

// Function to toggle theme
function toggleDarkMode() {
  bodyElement.classList.toggle("dark");
  localStorage.setItem("dark-mode", bodyElement.classList.contains("dark"));

  // smooth reload for icon animation + theme apply
  // setTimeout(() => {
  //   window.location.reload();
  // }, 150);
}

// Add click event on both buttons
toggleButtons.forEach((btn) => {
  if (btn) btn.addEventListener("click", toggleDarkMode);
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

// navbar
document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.querySelector("[data-scroll-container]");
  const navbar = document.getElementById("navbar");

  const scroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: true,
    smartphone: {
      smooth: true,
    },
    tablet: {
      smooth: true,
    },
  });

  let lastY = 0;

  scroll.on("scroll", (args) => {
    const currentY = args.scroll.y;

    if (currentY > lastY && currentY > 80) {
      // Scroll down → hide
      navbar.style.transform = "translateY(-150%)";
    } else {
      // Scroll up → show
      navbar.style.transform = "translateY(0)";
    }

    lastY = currentY;
  });
});

// canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let width,
  height,
  particles = [];
const spacing = 40,
  spotlightRadius = 300;
const mouse = { x: -1000, y: -1000 };
let particleColor = "0, 0, 0";
function updateColors() {
  particleColor = document.body.classList.contains("dark")
    ? "255, 255, 255"
    : "0, 0, 0";
}
class Particle {
  constructor(originX, originY) {
    this.originX = originX;
    this.originY = originY;
    this.x = originX;
    this.y = originY;
    this.baseSize = 2;
    this.floatOffset = Math.random() * Math.PI * 2;
    this.floatSpeed = 0.001 + Math.random() * 0.002;
    this.floatRange = 3 + Math.random() * 3;
    this.blinkOffset = Math.random() * Math.PI * 2;
    this.shapeOffset = Math.random() * Math.PI * 2;
    this.blinkSpeed = 0.002 + Math.random() * 0.003;
    this.shapeSpeed = 0.002 + Math.random() * 0.003;
  }
  update(time) {
    this.x =
      this.originX +
      Math.sin(time * this.floatSpeed + this.floatOffset) * this.floatRange;
    this.y =
      this.originY +
      Math.cos(time * this.floatSpeed + this.floatOffset) * this.floatRange;
  }
  draw(time) {
    const dx = mouse.x - this.x,
      dy = mouse.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < spotlightRadius) {
      const fade = 1 - dist / spotlightRadius;
      const blink =
        0.3 +
        0.7 * Math.abs(Math.sin(time * this.blinkSpeed + this.blinkOffset));
      const opacity = fade * blink;
      const shapePulse =
        1 + 0.5 * Math.sin(time * this.shapeSpeed + this.shapeOffset);
      const currentSize = this.baseSize * shapePulse;
      ctx.fillStyle = `rgba(${particleColor}, ${opacity})`;
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(time * 0.001 + this.shapeOffset);
      const w = currentSize * (1 + 0.3 * Math.sin(time * 0.005));
      const h = currentSize * (1 + 0.3 * Math.cos(time * 0.005));
      ctx.beginPath();
      ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.restore();
    }
  }
}
function init() {
  resize();
  updateColors();
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  requestAnimationFrame(animate);
}
function resize() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
  createParticles();
}
function createParticles() {
  particles = [];
  const centerX = width / 2;
  const centerY = height / 2;
  const maxRadius = Math.sqrt(width * width + height * height) / 2 + spacing;
  for (let r = 0; r < maxRadius; r += spacing) {
    const circumference = 2 * Math.PI * r;
    let particleCount = Math.floor(circumference / spacing);
    if (r === 0) particleCount = 1;
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const x = centerX + Math.cos(angle) * r;
      const y = centerY + Math.sin(angle) * r;
      particles.push(new Particle(x, y));
    }
  }
}
function animate(time) {
  ctx.clearRect(0, 0, width, height);
  particles.forEach((p) => {
    p.update(time);
    p.draw(time);
  });
  requestAnimationFrame(animate);
}
init();
// canvas
// menu
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
const icon = hamburgerBtn.querySelector("svg");

let isOpen = false;

const openMenu = () => {
  mobileMenu.style.opacity = "1";
  mobileMenu.style.transform = "scale(1)";
  mobileMenu.style.pointerEvents = "auto";
  icon.innerHTML = `
            <line x1="6" y1="6" x2="18" y2="18"></line>
            <line x1="18" y1="6" x2="6" y2="18"></line>
        `;
};

const closeMenu = () => {
  mobileMenu.style.opacity = "0";
  mobileMenu.style.transform = "scale(0.95)";
  mobileMenu.style.pointerEvents = "none";
  icon.innerHTML = `
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
        `;
};

hamburgerBtn.addEventListener("click", () => {
  isOpen ? closeMenu() : openMenu();
  isOpen = !isOpen;
});
//

/* ================= DATA ================= */
const skills = {
  frontend: {
    icon: "⚛️",
    title: "Frontend Development",
    desc: "I specialize in building scalable, high-performance user interfaces using the modern React ecosystem, with a strong focus on usability and clean architecture.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    fun: "Proven track record of delivering high-quality, production-ready React applications 🚀",
  },

  backend: {
    icon: "🖥️",
    title: "Backend Development",
    desc: "Experienced in designing secure, scalable, and maintainable backend systems, APIs, and data-driven architectures.",
    tools: ["Node.js", "Express", "PostgreSQL", "MongoDB", "GraphQL"],
    fun: "Comfortable with both RESTful and GraphQL-based architectures 💪",
  },

  design: {
    icon: "🎨",
    title: "UI / UX Design",
    desc: "I design intuitive, user-centric interfaces that balance aesthetics with functionality, ensuring a seamless digital experience.",
    tools: ["Figma", "Adobe XD", "Framer", "Design Systems"],
    fun: "Strong belief: great design is not just seen — it’s experienced 🎨",
  },

  database: {
    icon: "💾",
    title: "Database Management",
    desc: "Proficient in relational and NoSQL databases, with expertise in data modeling, optimization, and performance tuning.",
    tools: ["PostgreSQL", "MongoDB", "Redis", "Prisma", "Supabase"],
    fun: "I enjoy designing efficient data models and query optimizations 📊",
  },

  cloud: {
    icon: "☁️",
    title: "Cloud & DevOps",
    desc: "Skilled in cloud infrastructure and DevOps workflows, focusing on automation, reliability, and scalable deployments.",
    tools: ["AWS", "Docker", "GitHub Actions", "Vercel", "Terraform"],
    fun: "Deployment challenges don’t scare me anymore 😎",
  },

  performance: {
    icon: "⚡",
    title: "Performance Optimization",
    desc: "Dedicated to improving application speed, responsiveness, and Core Web Vitals through proven optimization techniques.",
    tools: ["Lighthouse", "Web Vitals", "Bundle Analysis", "Caching"],
    fun: "Achieving near-perfect Lighthouse scores is always the goal ⚡",
  },
};

const tabs = document.getElementById("tabs");
const mobileDrop = document.getElementById("mobileDropdown");
const mobileBtn = document.getElementById("mobileBtn");
const mobileArrow = document.getElementById("mobileArrow");
const mobileIcon = document.getElementById("mobileIcon");
const mobileTitle = document.getElementById("mobileTitle");
const detail = document.getElementById("detailBox");

let active = "frontend";

/* render */
Object.keys(skills).forEach((key) => {
  const b = document.createElement("button");
  b.className =
    "skill-tab border dark:border-gray-600 flex px-5 py-8 gap-8 justify-between w-full rounded-3xl dark:bg-myGray dark:text-white";
  b.dataset.key = key;
  b.innerHTML = `<div class="flex gap-3"><div class="icon-box">${skills[key].icon}</div>
               <span class="font-semibold text-left">${skills[key].title}</span></div>
               <span class="arrow">›</span>`;
  b.onclick = () => setActive(key);
  tabs.appendChild(b);

  const m = document.createElement("button");
  m.className = "w-full flex gap-4 p-4 hover:bg-green-500";
  m.innerHTML = `<div class="icon-box">${skills[key].icon}</div><span>${skills[key].title}</span>`;
  m.onclick = () => {
    setActive(key);
    toggleDrop(false);
  };
  mobileDrop.appendChild(m);
});

function setActive(key) {
  active = key;
  document
    .querySelectorAll(".skill-tab")
    .forEach((b) => b.classList.toggle("active", b.dataset.key === key));
  mobileIcon.innerText = skills[key].icon;
  mobileTitle.innerText = skills[key].title;
  document.getElementById("skillIcon").innerText = skills[key].icon;
  document.getElementById("skillTitle").innerText = skills[key].title;
  document.getElementById("skillDesc").innerText = skills[key].desc;
  document.getElementById("funText").innerText = `"${skills[key].fun}"`;
  const tools = document.getElementById("tools");
  tools.innerHTML = "";
  skills[key].tools.forEach((t, i) => {
    const s = document.createElement("span");
    s.className = "tool-pill bg-green-100 rounded-3xl px-3 py-2";
    s.innerText = t;
    s.dataset.dir = i % 2 ? 1 : -1;
    tools.appendChild(s);
  });
}

function toggleDrop(force) {
  const open = force ?? mobileDrop.classList.contains("hidden");
  mobileDrop.classList.toggle("hidden", !open);
  mobileArrow.style.transform = open ? "rotate(180deg)" : "rotate(0deg)";
}

mobileBtn.onclick = () => toggleDrop();
setActive(active);

/* tilt */
detail.addEventListener("mousemove", (e) => {
  const r = detail.getBoundingClientRect();
  const x = (e.clientX - r.left - r.width / 2) / 25;
  const y = (e.clientY - r.top - r.height / 2) / 25;
  detail.style.transform = `perspective(1200px) rotateY(${x}deg) rotateX(${-y}deg)`;
  document.querySelectorAll(".tool-pill").forEach((p) => {
    const d = p.dataset.dir || 1;
    p.style.transform = `translate(${x * d}px,${y * -d}px)`;
  });
});
detail.addEventListener("mouseleave", () => {
  detail.style.transform = "none";
  document
    .querySelectorAll(".tool-pill")
    .forEach((p) => (p.style.transform = "translate(0,0)"));
});

/* scroll */
window.addEventListener("scroll", () => {
  detail.classList.toggle("glass-scrolled", window.scrollY > 120);
});
