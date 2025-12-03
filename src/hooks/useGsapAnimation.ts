import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import gsap from 'gsap';

// Type for SplitText result
interface SplitTextResult {
  chars: HTMLElement[];
  words?: HTMLElement[];
  lines?: HTMLElement[];
  split(params?: { type?: string }): void;
}

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}
//fade animation
export const fadeAnimation = () => {
  gsap.utils.toArray<HTMLElement>(".tp_fade_anim").forEach((item) => {
    const tp_fade_offset = item.dataset.fadeOffset ? parseInt(item.dataset.fadeOffset) : 40;
    const tp_duration_value = item.dataset.duration ? parseFloat(item.dataset.duration) : 0.75;
    const tp_fade_direction = item.dataset.fadeFrom || "bottom";
    const tp_onscroll_value = item.dataset.onScroll !== "0";
    const tp_delay_value = item.dataset.delay ? parseFloat(item.dataset.delay) : 0.15;
    const tp_ease_value = item.dataset.ease || "power2.out";

    const tp_anim_setting: gsap.TweenVars = {
      opacity: 0,
      ease: tp_ease_value,
      duration: tp_duration_value,
      delay: tp_delay_value,
      x: (tp_fade_direction === "left" ? -tp_fade_offset : (tp_fade_direction === "right" ? tp_fade_offset : 0)),
      y: (tp_fade_direction === "top" ? -tp_fade_offset : (tp_fade_direction === "bottom" ? tp_fade_offset : 0)),
    };

    if (tp_onscroll_value) {
      tp_anim_setting.scrollTrigger = {
        trigger: item,
        start: 'top 85%',
      };
    }

    gsap.from(item, tp_anim_setting);
  });
}
// Fade Effect With Scroll //
export const revalEffectAnimation = () => {
  document.querySelectorAll(".tp_reveal_anim").forEach(areveal => {
    const duration = areveal.getAttribute("data-duration") || 1.5;
    const onScroll = areveal.getAttribute("data-on-scroll") || 1;
    const stagger = areveal.getAttribute("data-stagger") ? parseFloat(areveal.getAttribute("data-stagger") as string) : 0.02;
    const delay = areveal.getAttribute("data-delay") || 0.05;
    const split = new SplitText(areveal, {
      type: "lines,words,chars",
      linesClass: "tp-reveal-line"
    });
    const animConfig: gsap.TweenVars = {
      duration,
      delay,
      ease: "circ.out",
      y: 80,
      stagger,
      opacity: 0,
    };
    if (onScroll == 1) {
      animConfig.scrollTrigger = {
        trigger: areveal,
        start: 'top 85%',
      };
    }
    gsap.from(split.chars, animConfig);
  });
}

// character animation
export const charAnimation = () => {
  const charElements = document.querySelectorAll<HTMLElement>(".tp-char-animation");

  if (charElements.length > 0) {
    const animationItems = gsap.utils.toArray<HTMLElement>(".tp-char-animation");

    animationItems.forEach((splitTextLine) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: splitTextLine,
          start: 'top 90%',
          end: 'bottom 60%',
          scrub: false,
          markers: false,
          toggleActions: 'play none none none'
        }
      });

      // Type assertion for SplitText result
      const itemSplitted = new SplitText(splitTextLine, {
        type: "chars, words"
      }) as unknown as SplitTextResult;

      gsap.set(splitTextLine, { perspective: 300 });
      itemSplitted.split({ type: "chars, words" });

      tl.from(itemSplitted.chars, {
        duration: 1,
        delay: 0.5,
        x: 100,
        autoAlpha: 0,
        stagger: 0.05
      });
    });
  }
}

// tp-text-right-scroll animation
export const textRightScrollAnimation = () => {
  gsap.matchMedia().add("(min-width: 991px)", () => {
    document.querySelectorAll(".title-box").forEach((box) => {
      const rightElements = box.querySelectorAll('.tp-text-right-scroll');
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: box,
          start: "top 100%",
          end: "bottom top",
          scrub: true,
          markers: false,
        }
      });
      if (rightElements.length) {
        tl.fromTo(rightElements, { xPercent: 50 }, { xPercent: -20, ease: "power1.out" }, 0);
      }
    });
  });
};

// service panel animation
export const servicePanelAnimation = () => {
  const sv = gsap.matchMedia();
  sv.add("(min-width: 1199px)", () => {
    const tl = gsap.timeline();
    const projectpanels = document.querySelectorAll('.tp-service-panel');
    const baseOffset = 150;
    const offsetIncrement = 120;

    projectpanels.forEach((section, index) => {
      const topOffset = baseOffset + (index * offsetIncrement);
      tl.to(section, {
        scrollTrigger: {
          trigger: section,
          pin: section,
          scrub: 1,
          start: `top ${topOffset}px`,
          end: "bottom 120%",
          endTrigger: '.tp-service-pin',
          pinSpacing: false,
          markers: false,
        },
      });
    });
  });
};

//funfact panel animation
export const funfactPanelAnimation = () => {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 1200px)", () => {
    const wrap = document.querySelector<HTMLElement>(".tp-funfact-panel-wrap");
    if (!wrap) return;

    const sections = gsap.utils.toArray<HTMLElement>(".tp-funfact-panel");

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        start: "top 70px",
        trigger: wrap,
        pin: true,
        scrub: 1,
        end: () => "+=" + wrap.offsetWidth,
      },
    });
  });
};

// panel pin section
export const panelAnimation = (): void => {
  const pr = gsap.matchMedia();
  pr.add("(min-width: 1199px)", () => {
    const tl = gsap.timeline();
    const panels = document.querySelectorAll('.tp-panel-pin')
    panels.forEach((section) => {
      tl.to(section, {
        scrollTrigger: {
          trigger: section,
          pin: section,
          scrub: 1,
          start: 'top 10%',
          end: "bottom 99%",
          endTrigger: '.tp-panel-pin-area',
          pinSpacing: false,
          markers: false,
        },
      })
    })
  });
};

// Scroll-triggered background animation for text lines
export const textInvertAnim = (className: string) => {
  const split = new SplitText(`.${className}`, { type: "lines" });
  split.lines.forEach((target) => {
    gsap.to(target, {
      backgroundPositionX: 0,
      ease: "none",
      scrollTrigger: {
        trigger: target,
        scrub: 1,
        start: 'top 85%',
        end: "bottom center"
      }
    });
  });
};
// Convenience hooks for each variant
export const textInvertAnim1 = () => textInvertAnim('tp_text_invert');
export const textInvertAnim2 = () => textInvertAnim('tp_text_invert_2');
export const textInvertAnim3 = () => textInvertAnim('tp_text_invert_3');

//Home Main Setup GSAP video animation
export const videoAnimation = () => {
  const vd = gsap.matchMedia();
  vd.add("(min-width: 1199px)", () => {
    gsap.timeline({
      scrollTrigger: {
        trigger: ".tp-video-area",
        scrub: 1,
        pin: true,
        start: "top 40px",
        end: "+=100%"
      }
    })
      .to(".tp-video-thumb-wrap", {
        scale: 3.2,
        ease: "none"
      })
  });
};
//hero animation
export const heroAnimation = () => {
  const tl = gsap.timeline();
  const hr = gsap.matchMedia();
  hr.add("(min-width: 768px)", () => {
    const panels = document.querySelectorAll('.tp-hero-2-area')
    panels.forEach((section) => {
      tl.to(section, {
        scrollTrigger: {
          trigger: '.tp-hero-2-wrapper',
          pin: '.tp-hero-2-area',
          scrub: 1,
          start: 'top 0',
          end: "bottom 0%",
          endTrigger: '.tp-hero-2-wrapper',
          pinSpacing: false,
          markers: false,
        },
      })
    })
  });
}
//design choose animation
export const designChooseAnimation = () => {
  const pw = gsap.matchMedia();
  pw.add("(min-width: 1200px)", () => {
    document.querySelectorAll('.design-choose-item-wrap').forEach(item => {
      gsap.set(item.querySelector('.design-choose-item-1'), { x: -400, rotate: -40 });
      gsap.set(item.querySelector('.design-choose-item-2'), { x: 400, rotate: 40 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 120%',
          end: 'top 20%',
          scrub: 1,
        }
      });
      tl.to(item.querySelector('.design-choose-item-1'), { x: 0, rotate: 0 })
        .to(item.querySelector('.design-choose-item-2'), { x: 0, rotate: 0 }, 0);
    });
  });
};

// design agency award animation
export const designAwardAnimation = () => {
  const aw = gsap.matchMedia();
  aw.add("(min-width: 991px)", () => {
    const awardItems = document.querySelectorAll('.design-award-item');
    awardItems.forEach(function (div) {
      div.addEventListener('mouseenter', function () {
        gsap.to(div, {
          width: '100%',
          duration: 2,
          ease: 'expo.out'
        });
      });
      div.addEventListener('mouseleave', function () {
        gsap.to(div, {
          width: '70%',
          duration: 2,
          ease: 'expo.out'
        });
      });
    })
  });
};

// studio-project animation
export const studioProjectAnimation = () => {
  const perspective_1 = gsap.matchMedia();

  perspective_1.add("(min-width: 767px)", () => {
    const wrap = document.querySelector(".studio-project-wrap");
    if (wrap) {
      gsap.set(".studio-project-thumb", { perspective: 60 });
      const images = document.querySelectorAll<HTMLImageElement>(".studio-project-thumb img");
      images.forEach((img) => {
        gsap.fromTo(
          img,
          {
            rotationX: 1.8,
            z: "0vh",
          },
          {
            rotationX: -0.5,
            z: "-2vh",
            scrollTrigger: {
              trigger: img,
              start: "top+=150px bottom",
              end: "bottom top",
              immediateRender: false,
              scrub: 0.1,
            },
          }
        );
      });
    }
  });
};

//  Text reveal animation
export function textRevealAnimation() {

  const elements = document.querySelectorAll<HTMLElement>('.tp-text-revel-anim');

  elements.forEach(element => {
    // Helper function to safely get and parse attributes
    const getNumberAttribute = (attr: string, defaultValue: number): number => {
      const value = element.getAttribute(attr);
      return value ? parseFloat(value) : defaultValue;
    };

    const getStringAttribute = (attr: string, defaultValue: string): string => {
      return element.getAttribute(attr) || defaultValue;
    };

    const duration = getNumberAttribute('data-duration', 1);
    const onScroll = getNumberAttribute('data-on-scroll', 1);
    const stagger = getNumberAttribute('data-stagger', 0.02);
    const delay = getNumberAttribute('data-delay', 0.05);
    const ease = getStringAttribute('data-ease', 'circ.out');

    const split = new SplitText(element, {
      type: "lines,words,chars",
      linesClass: "tp-revel-line"
    });

    const animationProps = {
      duration,
      delay,
      ease,
      y: 80,
      stagger,
      opacity: 0,
    };

    if (onScroll === 1) {
      gsap.from(split.chars, {
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
        },
        ...animationProps,
      });
    } else {
      gsap.from(split.chars, animationProps);
    }
  });
};

// Text paragraph animation
export function animationParagraph() {
  const paragraphs = gsap.utils.toArray<HTMLElement>('.tp_text_anim p');
  paragraphs.forEach((paragraph) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: paragraph,
        start: 'top 90%',
        end: 'bottom 60%',
        scrub: false,
        markers: false,
        toggleActions: 'play none none none'
      }
    });

    const splitText = new SplitText(paragraph, { type: "lines" });
    gsap.set(paragraph, { perspective: 400 });
    tl.from(splitText.lines, {
      duration: 1,
      delay: 0.2,
      opacity: 0,
      rotationX: -80,
      force3D: true,
      transformOrigin: "top center -50",
      stagger: 0.1
    });
  });
}

// team animation 
export const teamAnimation = () => {
  const tm = gsap.matchMedia();
  tm.add("(min-width: 991px)", () => {
    const tl_team = gsap.timeline();
    const panels = document.querySelectorAll('.studio-team-area')
    panels.forEach((section) => {
      tl_team.to(section, {
        scrollTrigger: {
          trigger: '.studio-team-area',
          pin: '.studio-team-title-box',
          scrub: 1,
          start: 'top 17%',
          end: "bottom 90%",
          endTrigger: '.studio-team-area',
          pinSpacing: false,
          markers: false,
        },
      })
    })
  });
};

// tp-text-perspective 
export const textPerspectiveAnimation = () => {
  gsap.utils.toArray<HTMLElement>(".tp-text-perspective").forEach(splitTextLine => {
    const delayAttr = splitTextLine.getAttribute('data-delay');
    const delay_value = delayAttr ? parseFloat(delayAttr) : 0.5;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: splitTextLine,
        start: 'top 85%',
        scrub: false,
        markers: false,
        toggleActions: 'play none none none'
      }
    });
    const itemSplitted = new SplitText(splitTextLine, { type: "lines" });
    gsap.set(splitTextLine, { perspective: 400 });
    itemSplitted.split({ type: "lines" });

    tl.from(itemSplitted.lines, {
      duration: 1,
      delay: delay_value,
      opacity: 0,
      rotationX: -80,
      force3D: true,
      transformOrigin: "top center -50",
      stagger: 0.1
    });
  });
};

//corporate agency hero eye anim
export const eyeAnimation = () => {
  const eyeball = (e: MouseEvent) => {
    const eyes = document.querySelectorAll<HTMLElement>('.eye');
    eyes.forEach((eye) => {
      const rect = eye.getBoundingClientRect();
      const x = rect.left + eye.clientWidth / 3;
      const y = rect.top + eye.clientHeight / 3;

      const radian = Math.atan2(e.pageX - x, e.pageY - y);
      const rotation = radian * (180 / Math.PI) * -1 + 270;

      eye.style.transform = `rotate(${rotation}deg)`;
    });
  };

  document.body.addEventListener('mousemove', eyeball);

  return () => {
    document.body.removeEventListener('mousemove', eyeball);
  };
};

// stack panel pin animation for home-10
export function panelPinAnimation() {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 1199px)", () => {
    const panels = document.querySelectorAll('.stack-panel-pin');
    if (!panels.length) return;

    const tl = gsap.timeline();

    panels.forEach((section,) => {
      tl.to(section, {
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: "bottom 100%",
          endTrigger: '.stack-panel-pin-area',
          pinSpacing: false,
          markers: false,
        },
      });
    });
  });
}

// gsap background for home-11
export const gsapBackgroundAnim = () => {
  gsap.set(".tp-gsap-bg", { scaleX: 1 });
  const mm = gsap.matchMedia();
  mm.add("(min-width:1400px)", () => {
    gsap.to(".tp-gsap-bg", {
      scrollTrigger: {
        trigger: ".tp-gsap-bg",
        scrub: 0.2,
        start: "top 90%",
        end: "bottom 100%",
      },
      scaleX: 0.85,
      borderRadius: "60px",
      transformOrigin: "center center",
      ease: "none",
    });
  });
};

// Split text animation 
export const splitTextAnimation = () => {
  const splitTextElements = document.querySelectorAll('.tp-split-text');
  if (splitTextElements.length === 0) return;
  const animations: gsap.core.Tween[] = [];
  const splits: SplitText[] = [];

  splitTextElements.forEach((el) => {
    // Create SplitText instance
    const split = new SplitText(el, {
      type: "lines,words,chars",
      linesClass: "tp-split-line"
    });
    splits.push(split);

    gsap.set(el, { perspective: 400 });
    const animationProps: gsap.TweenVars = { opacity: 0 };

    if (el.classList.contains('tp-split-right')) animationProps.x = "50";
    if (el.classList.contains('tp-split-left')) animationProps.x = "-50";
    if (el.classList.contains('tp-split-up')) animationProps.y = "80";
    if (el.classList.contains('tp-split-down')) animationProps.y = "-80";

    gsap.set(split.chars as gsap.TweenTarget, animationProps);

    // Create animation
    const anim = gsap.to(split.chars as gsap.TweenTarget, {
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        markers: false
      },
      x: "0",
      y: "0",
      rotateX: "0",
      scale: 1,
      opacity: 1,
      duration: 0.4,
      stagger: 0.02,
    });
    animations.push(anim);
  });
}

//image zoom in animation
export function zoomInAnimation() {
  const zoomElements = document.querySelectorAll('.anim-zoomin')

  zoomElements.forEach(element => {
    const wrapper = document.createElement('div')
    wrapper.className = 'anim-zoomin-wrap'
    wrapper.style.overflow = 'hidden'

    // Wrap the element
    element.parentNode?.insertBefore(wrapper, element)
    wrapper.appendChild(element)

    // Create animation timeline
    const zoomInTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: 'top 100%',
        markers: false,
      }
    })

    zoomInTimeline.from(element, {
      duration: 2,
      autoAlpha: 0,
      scale: 1.2,
      ease: 'power2.out',
      clearProps: 'all'
    })
  })
  return null
}

// Portfolio title zoom animation function
export function portfolioTitleAnimation() {
  const pm = gsap.matchMedia();

  pm.add("(min-width: 1200px)", () => {
    const portfolioArea = document.querySelector('.st-portfolio-area');
    if (!portfolioArea) return;

    const projectText = gsap.timeline({
      scrollTrigger: {
        trigger: portfolioArea,
        start: 'top 5%',
        end: "bottom 55%",
        pin: ".st-portfolio-heading",
        markers: false,
        pinSpacing: false,
        scrub: 1,
      }
    });

    projectText
      .set(".st-portfolio-title", {
        scale: 0.9,
        duration: 2
      })
      .to(".st-portfolio-title", {
        scale: 1.2,
        duration: 2
      })
      .to(".st-portfolio-title", {
        scale: 1.2,
        duration: 2
      }, "+=2");

    // Cleanup function
    return () => {
      projectText.kill();
    };
  })
}

//startup agency cta section animation
export const ctaAnimation = () => {
  const blogArea = document.querySelector('.st-blog-area');
  if (!blogArea) return;

  gsap.to(".st-cta-bg-circle", {
    scrollTrigger: {
      trigger: ".st-cta-area",
      scrub: 0.2,
      start: "top 70%",
      end: "bottom 100%",
    },
    duration: 2,
    scaleX: 1,
    borderRadius: "1100px 1100px 0 0",
    transformOrigin: "top center",
    ease: "none",
  });
  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
};

// Image Reveal Animation //
export function imageRevealAnimation() {
  const tp_img_reveal = document.querySelectorAll(".tp_img_reveal");
  if (!tp_img_reveal.length) return () => { };

  const ctx = gsap.context(() => {
    tp_img_reveal.forEach((img_reveal) => {
      const image = img_reveal.querySelector("img");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: img_reveal,
          start: "top 70%",
        }
      });

      tl.set(img_reveal, { autoAlpha: 1 });
      tl.from(img_reveal, {
        duration: 1.5,
        xPercent: -100,
        ease: "power2.out"
      });
      tl.from(image, {
        duration: 1.5,
        xPercent: 100,
        scale: 1.5,
        delay: -1.5,
        ease: "power2.out"
      });
    });
  });

  return () => ctx.revert();
}

// tp-project-5-2-area anim //
export function portfolioProjectAnimation() {
  // Animation timeline
  const project_text = gsap.timeline({
    scrollTrigger: {
      trigger: ".tp-project-5-2-area",
      start: 'top center-=350',
      end: "bottom 150%",
      pin: ".tp-project-5-2-title",
      markers: false,
      pinSpacing: false,
      scrub: 1,
    }
  });

  project_text.set(".tp-project-5-2-title", {
    scale: 0.6,
    duration: 2
  })
    .to(".tp-project-5-2-title", {
      scale: 1,
      duration: 2
    })
    .to(".tp-project-5-2-title", {
      scale: 1,
      duration: 2
    }, "+=2");

  // Cleanup function
  return () => {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    project_text.kill();
  };
}

// text Effects for footer title
export const randChar = (): string => {
  const chars = "hello@gmail.com";
  return chars[Math.floor(Math.random() * chars.length)];
};

export const setupTextHoverEffect = (): void => {
  document.querySelectorAll<HTMLElement>('.codetext').forEach((t: HTMLElement) => {
    const arr1: string[] = t.innerHTML.split('');
    const arr2: string[] = arr1.map(() => randChar());

    t.onpointerover = (): void => {
      const tl = gsap.timeline();
      let step: number = 0;

      tl.fromTo(
        t,
        { innerHTML: arr2.join('') },
        {
          duration: arr1.length / 20,
          ease: 'power4.in',
          delay: 0.1,
          onUpdate: (): void => {
            const progress: number = Math.floor(tl.progress() * arr1.length);
            if (step !== progress) {
              step = progress;
              arr1.forEach((_, i) => (arr2[i] = randChar()));

              let start: string = arr1.slice(0, progress).join('');
              let end: string = arr2.slice(progress).join('');

              if (t.classList.contains('fromRight')) {
                start = arr2.slice(0, progress).join('');
                end = arr1.slice(progress).join('');
              }

              t.innerHTML = start + end;
            }
          },
        }
      );
    };
  });
};

// product banner animation
export function productBannerAnimation() {
  const shop_thumb = gsap.matchMedia();
  const wrap = document.querySelector('.tp-shop-product-area');

  shop_thumb.add("(min-width: 1200px)", () => {
    if (wrap) {
      ScrollTrigger.create({
        trigger: ".tp-shop-product-area",
        start: "top 15px",
        end: "bottom 103%",
        pin: ".tp-shop-product-banner",
        pinSpacing: true,
      });
    }
  });

  return () => {
    shop_thumb.revert();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  };
}

// hero bg Animation 
export function heroBgAnimation() {
  const t2 = gsap.timeline({
    scrollTrigger: {
      trigger: ".cr-hero-bottom-wrap, .cr-footer-bg",
      start: "top 110%",
    }
  })
  t2.from(".bg-b", {
    y: 100,
    opacity: 0,
    duration: 1
  })
  t2.from(".bg-l", {
    x: 100,
    opacity: 0,
    duration: 1
  }, "-=0.5")

  t2.from(".bg-r", {
    x: -100,
    opacity: 0,
    duration: 1
  }, "-=1")
}

// pp-top-wrap //
export function PPAboutAnimation() {
  const tl = gsap.timeline();
  const p = gsap.matchMedia();
  p.add("(min-width: 992px)", () => {
    const panels = document.querySelectorAll('.pp-top-wrap');
    panels.forEach((section) => {
      tl.to(section, {
        scrollTrigger: {
          trigger: '.pp-top-wrap',
          pin: '.pp-about-me-area',
          scrub: 1,
          start: 'top 0',
          end: "bottom 0%",
          endTrigger: '.pp-top-wrap',
          pinSpacing: false,
          markers: false,
        },
      });
    });
  });
}

//inner service animation
export function innerServiceAnimation() {
  const sr = gsap.matchMedia();
  sr.add("(min-width: 992px)", () => {
    const tl_ser = gsap.timeline();
    const panels = document.querySelectorAll('.tp-inner-service-area')
    panels.forEach((section) => {
      tl_ser.to(section, {
        scrollTrigger: {
          trigger: '.tp-inner-service-area',
          pin: '.inner-service-1-left',
          scrub: 1,
          start: 'top 80px',
          end: "bottom 100%",
          endTrigger: '.tp-inner-service-area',
          pinSpacing: false,
          markers: false,
        },
      })
    })
  });
}

//career details animation
export function careerAnimation() {
  const cr = gsap.matchMedia();
  cr.add("(min-width: 1200px)", () => {
    const tl_ser = gsap.timeline();
    const panels = document.querySelectorAll('.tp-career-details-ptb')
    panels.forEach((section) => {
      tl_ser.to(section, {
        scrollTrigger: {
          trigger: '.tp-career-details-wrapper',
          pin: '.tp-career-details-sidebar',
          scrub: 1,
          start: 'top 80px',
          end: "bottom 100%",
          endTrigger: '.tp-career-details-ptb',
          pinSpacing: false,
          markers: false,
        },
      })
    })
  });
}

// Button bounce animation
export const buttonBounceAnimation = () => {
  gsap.set(".tp-bounce", { y: -80, opacity: 0 });
  const mybtn = gsap.utils.toArray(".tp-bounce") as HTMLElement[];

  mybtn.forEach((btn) => {
    const tp_delay_value = btn.getAttribute("data-delay") || 1;
    const triggerElement = btn.closest(".tp-bounce-trigger");

    gsap.to(btn, {
      scrollTrigger: {
        trigger: triggerElement,
        start: "top center",
        markers: false,
      },
      duration: 1.5,
      delay: tp_delay_value,
      ease: "bounce.out",
      y: 0,
      opacity: 1,
    });
  });
};

// portfolio-slicer animation
export const PortfolioSlicerAnimation = () => {
  if (window.innerWidth >= 1200) {
    gsap.set('.tp-portfolio-slicer-wrap .pro-img-1 img', {
      x: 500,
    });
    gsap.set('.tp-portfolio-slicer-wrap .pro-img-2 img', {
      x: -500,
    });

    const portfolioWraps = gsap.utils.toArray<HTMLElement>('.tp-portfolio-slicer-wrap');

    portfolioWraps.forEach((wrap) => {
      // Animate first image
      gsap.to(wrap.querySelector('.pro-img-1 img'), {
        x: 0,
        scrollTrigger: {
          trigger: wrap,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1,
          markers: false,
        },
      });

      // Animate second image
      gsap.to(wrap.querySelector('.pro-img-2 img'), {
        x: 0,
        scrollTrigger: {
          trigger: wrap,
          start: 'top 70%',
          end: 'bottom 30%',
          scrub: 1,
        },
      });
    });
  }
};

//portfolio showcase animation
export const portfolioShowcaseAnimation = () => {
  const pr = gsap.matchMedia();
  const tl = gsap.timeline();

  pr.add("(min-width: 767px)", () => {
    const otherSections = document.querySelectorAll('.showcase-portfolio-panel')
    otherSections.forEach((section) => {
      gsap.set(otherSections, {
        scale: 1,
      });
      tl.to(section, {
        scale: .8,
        scrollTrigger: {
          trigger: section,
          pin: section,
          scrub: 1,
          start: 'top 5%',
          end: "bottom 100%",
          endTrigger: '.showcase-portfolio-wrap',
          pinSpacing: false,
          markers: false,
        },
      })
    })
  });
};

//tp-gsap-bg animation
export const contactBgAnimation = () => {
  gsap.set(".tp-gsap-bg", { scaleX: 1 });
  const mm = gsap.matchMedia();
  mm.add("(min-width:1400px)", () => {
    gsap.to(".tp-gsap-bg", {
      scrollTrigger: {
        trigger: ".tp-gsap-bg",
        scrub: 0.2,
        start: "top 90%",
        end: "bottom 100%",
      },
      scaleX: 0.85,
      borderRadius: "60px",
      transformOrigin: "center center",
      ease: "none",
    });
  });
};

//text moving animation
export const scrollMovingText = () => {
  gsap.utils.toArray<HTMLElement>('.moving-text').forEach((section, index) => {
    const w = section.querySelector<HTMLElement>('.wrapper-text');
    if (!w) return;

    const [x, xEnd] = (index % 2) ?
      [section.offsetWidth - w.scrollWidth, 0] :
      [0, section.offsetWidth - w.scrollWidth];

    gsap.fromTo(w, { x }, {
      x: xEnd,
      scrollTrigger: {
        trigger: section,
        scrub: 0.1,
        invalidateOnRefresh: true,
      }
    });
  });
}
//design studio portfolio animation
export const portfolioAnimation = () => {
  const otherSections = document.querySelectorAll('.des-portfolio-panel')
  const tl = gsap.timeline();
  otherSections.forEach((section) => {
    gsap.set(otherSections, {
      scale: 1,
    });
    tl.to(section, {
      scale: .8,
      scrollTrigger: {
        trigger: section,
        pin: section,
        scrub: 1,
        start: 'top 0',
        end: "bottom 60%",
        endTrigger: '.des-portfolio-wrap',
        pinSpacing: false,
        markers: false,
      },
    })
  })
}

//design project animation
export const designProjectAnimation = () => {
  const pw = gsap.matchMedia();
  pw.add("(min-width: 991px)", () => {
    gsap.set('.design-project-thumb.item-1', { x: 400, rotate: 10, });
    gsap.set('.design-project-thumb.item-2', { x: -400, rotate: -10, });
    document.querySelectorAll('.design-project-item').forEach(item => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 100%',
          end: 'bottom center',
          scrub: 1,
        }
      });
      tl.to(item.querySelector('.design-project-thumb.item-1'), { x: 0, rotate: 0 })
        .to(item.querySelector('.design-project-thumb.item-2'), { x: 0, rotate: 0 }, 0);
    });
  });
}

// portfolio item pin js //
export const portfolioItemPinAnimation = () => {
  const pi = gsap.matchMedia();
  pi.add("(min-width: 1200px)", () => {
    document.querySelectorAll('.tp-pd-3-portfolio-item-wrap').forEach((group) => {
      const panels = group.querySelectorAll('.tp-pd-3-portfolio-item');
      const pinTarget = group.querySelector('.tp-pd-3-content-pin');
      panels.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          pin: pinTarget,
          start: 'top 20%',
          end: 'bottom center',
          scrub: 1,
          pinSpacing: false,
          markers: false,
        });
      });
    });
  });
}

//  scroll animation //
export const scrollAnimation = () => {
  gsap.matchMedia().add("(min-width: 991px)", () => {
    document.querySelectorAll(".img-box").forEach((box) => {
      gsap.fromTo(
        box.querySelectorAll('.tp-top-bottom-scroll'),
        { yPercent: 20 },
        {
          yPercent: -26, ease: "power1.out", scrollTrigger: {
            trigger: box,
            start: "top 100%",
            end: "bottom top",
            scrub: true,
            markers: false,
          }
        }
      );
    });
  });
}
export const projectDetailsAnim = () => {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 1200px)", () => {
    if (document.querySelector(".project-details-2-area")) {
      ScrollTrigger.create({
        trigger: ".project-details-2-area",
        start: "top top",
        end: "bottom -100%",
        pin: ".project-details-video",
        pinSpacing: false,
      });
    }
  });
};

// perspective-slider animation //
export const perspectiveAnim = () => {
  gsap.set('.tp-perspective-slider .tp-perspective-main .tp-perspective-inner', { perspective: 60 });

  document.querySelectorAll('.tp-perspective-slider .tp-perspective-main .tp-perspective-inner .tp-perspective-image')
    .forEach((slide) => {
      gsap.fromTo(slide,
        {
          rotationX: 1.8,
          scaleX: 1,
          z: '0vh'
        },
        {
          rotationX: -0.5,
          scaleX: 1,
          z: '-2vh',
          scrollTrigger: {
            trigger: slide,
            start: "top+=150px bottom",
            end: "bottom top",
            immediateRender: false,
            scrub: 0.1,
          }
        }
      );
    });
};

// brand img animation //
export const brandImgAnim = () => {
  gsap.set(".tp-brand-inner-item img", { scale: 1.3, opacity: 0 });
  gsap.to(".tp-brand-inner-item img", {
    scale: 1,
    opacity: 1,
    duration: 1.5,
    ease: "bounce.out",
    stagger: {
      each: 0.1
    },
    scrollTrigger: {
      trigger: '.tp-brand-inner-area',
      start: "top 100%"
    }
  })
}
