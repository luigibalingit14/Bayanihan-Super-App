import { gsap } from "gsap";

/** Respect user's reduced-motion preference */
const prefersReducedMotion =
  typeof window !== "undefined"
    ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
    : false;

/**
 * Staggered fade-in + translateY animation for a list of elements.
 */
export function animateIn(
  targets: gsap.TweenTarget,
  options: { delay?: number; stagger?: number } = {}
) {
  if (prefersReducedMotion) return;
  gsap.fromTo(
    targets,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
      stagger: options.stagger ?? 0.1,
      delay: options.delay ?? 0,
    }
  );
}

/**
 * Scale + glow on hover for a single element.
 * Returns an object with `addListeners` and `removeListeners`.
 */
export function hoverScale(el: HTMLElement, glowColor = "rgba(252,209,22,0.3)") {
  if (prefersReducedMotion) return { addListeners: () => {}, removeListeners: () => {} };

  const onEnter = () => {
    gsap.to(el, {
      scale: 1.04,
      boxShadow: `0 16px 48px rgba(0,0,0,0.5), 0 0 32px ${glowColor}`,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const onLeave = () => {
    gsap.to(el, {
      scale: 1,
      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      duration: 0.3,
      ease: "power2.inOut",
    });
  };

  return {
    addListeners: () => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    },
    removeListeners: () => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    },
  };
}

/**
 * Press-down animation for buttons.
 */
export function pressAnimation(el: HTMLElement) {
  if (prefersReducedMotion) return;
  gsap.to(el, { scale: 0.95, duration: 0.1, ease: "power2.in", yoyo: true, repeat: 1 });
}

/**
 * Page entrance animation — hero heading slides in from left.
 */
export function pageTransition(container: HTMLElement) {
  if (prefersReducedMotion) return;
  gsap.fromTo(
    container,
    { opacity: 0, x: -30 },
    { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
  );
}

/**
 * Success checkmark / bounce-in animation for form feedback.
 */
export function successBounce(el: HTMLElement) {
  if (prefersReducedMotion) return;
  gsap.fromTo(
    el,
    { scale: 0, opacity: 0 },
    { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
  );
}
