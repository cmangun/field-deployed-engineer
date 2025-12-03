"use client";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import { useState } from "react";
import { gsap } from "gsap";

export default function useScrollSmooth() {
  const [isScrollSmooth] = useState<boolean>(true);

  useGSAP(() => {
    // Register plugins
    gsap.registerPlugin(ScrollSmoother);

    const smoothWrapper = document.getElementById("smooth-wrapper");
    const smoothContent = document.getElementById("smooth-content");

    if (smoothWrapper && smoothContent && isScrollSmooth) {
      gsap.config({
        nullTargetWarn: false,
      });

      ScrollSmoother.create({
        smooth: 2,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: false,
        ignoreMobileResize: true,
      });
    }
  }, [isScrollSmooth]);
}