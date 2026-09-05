"use client";

import { useEffect } from "react";

export default function HomeMotion() {
  useEffect(() => {
    const home = document.querySelector<HTMLElement>("[data-spatial-home]");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (
      !home
      || !finePointer.matches
      || window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) return;

    let frame = 0;
    const update = (event: PointerEvent) => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const x = (event.clientX / window.innerWidth - 0.5) * 18;
        const y = (event.clientY / window.innerHeight - 0.5) * 12;
        home.style.setProperty("--parallax-x", `${x.toFixed(2)}px`);
        home.style.setProperty("--parallax-y", `${y.toFixed(2)}px`);
      });
    };

    window.addEventListener("pointermove", update, { passive: true });
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", update);
    };
  }, []);

  return null;
}
