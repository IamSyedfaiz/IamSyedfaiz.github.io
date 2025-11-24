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

// hover
options = {
  cursorOuter: "circle-basic",
  hoverEffect: "circle-move",
  hoverItemMove: true,
  defaultCursor: false,
  outerWidth: 30,
  outerHeight: 30,
};
magicMouse(options);

$(".img-cursor").mouseover(function () {
  $("#magicMouseCursor").addClass("change");
}),
  $(".img-cursor").mouseleave(function () {
    $("#magicMouseCursor").removeClass("change");
  });
