import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/all";
import { gsap } from "gsap";
import $ from "jquery";

gsap.registerPlugin(ScrollTrigger, SplitText);

// bounce animation
function bounceAnimation() {
  const bounceElements = document.querySelectorAll<HTMLElement>(".tp-btn-bounce");

  if (bounceElements.length > 0) {
    gsap.set(".tp-btn-bounce", { y: -100, opacity: 0 });

    const buttons = gsap.utils.toArray<HTMLElement>(".tp-btn-bounce");

    buttons.forEach((btn) => {
      const $btn = $(btn);
      const triggerElement = $btn.closest(".tp-btn-trigger").get(0);
      const delayValue = parseFloat(btn.dataset.delay || "1");

      if (!triggerElement) return;

      gsap.to(btn, {
        scrollTrigger: {
          trigger: triggerElement,
          start: "top center",
          markers: false,
        },
        duration: 1.5,
        delay: delayValue,
        ease: "bounce.out",
        y: 0,
        opacity: 1,
      });
    });
  }
}


function textBounceAnimation() {
  const triggerElements = $('.tp-text-bounce-trigger');

  if (triggerElements.length > 0) {
    // Set initial state
    gsap.set(".tp-text-bounce", { y: 100, opacity: 0 });

    // Get all bounce elements with proper typing
    const bounceElements = gsap.utils.toArray<HTMLElement>(".tp-text-bounce");

    bounceElements.forEach((btn) => {
      const $btn = $(btn);
      const triggerElement = $btn.closest('.tp-text-bounce-trigger').get(0);
      const delayValue = parseFloat($btn.attr("data-delay") || "0.15");

      // Safety check for trigger element
      if (!triggerElement) return;

      // Create the animation
      gsap.to(btn, {
        scrollTrigger: {
          trigger: triggerElement,
          start: "top center",
          markers: false
        },
        duration: 1,
        delay: delayValue,
        ease: "back.out(1.7)",
        y: 0,
        opacity: 1,
      });
    });
  }
}
export { bounceAnimation, textBounceAnimation};