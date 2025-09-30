import { animate } from "animejs";

export function animateCheckbox(checkboxSVG, onAnimationComplete) {
  const checkmarkPath = checkboxSVG.querySelector(".checkbox-checkmark");
  const circle = checkboxSVG.querySelector(".checkbox-circle");
  const pathLength = checkmarkPath.getTotalLength();

  checkmarkPath.style.strokeDasharray = pathLength;
  checkmarkPath.style.strokeDashoffset = pathLength;
  checkmarkPath.style.opacity = "1";

  animate(circle, {
    stroke: ["#888", "#00C4B4"],
    duration: 400,
    ease: "outSine",
  });

  const checkAnimation = animate(checkmarkPath, {
    strokeDashoffset: [pathLength, 0],
    duration: 500,
    ease: "outSine",
    delay: 100,
  });

  checkAnimation.then(() => {
    onAnimationComplete();
  });
}
