// export function parallaxSlider() {
//   const images: HTMLElement[] = Array.from(document.querySelectorAll<HTMLElement>('.parallax-img'));
//   const slider = document.querySelector('.parallax-sliders') as HTMLElement;
//   const sliderWrapper = document.querySelector('.parallax-slider-wrapper') as HTMLElement;
//   let sliderWidth: number;
//   let imageWidth: number;
//   let current = 0;
//   let target = 0;
//   const ease = 0.05;

//   window.addEventListener('resize', init);

//   images.forEach((img, idx) => { 
//     img.style.backgroundImage = `url(/assets/img/project-slider-img/portfolio-slider-5/port-${idx + 1}.jpg)`;
//   });

//   // Add wheel event listener
//   sliderWrapper.addEventListener('wheel', (e) => {
//     e.preventDefault();
//     target += e.deltaY * 0.5;
    
//     // Limit target to valid range
//     target = Math.max(0, target);
//     target = Math.min(sliderWidth - window.innerWidth, target);
//   });

//   function lerp(start: number, end: number, t: number): number {
//     return start * (1 - t) + end * t;
//   }

//   function setTransform(el: HTMLElement, transform: string) {
//     el.style.transform = transform;
//   }

//   function init() {
//     sliderWidth = slider.getBoundingClientRect().width;
//     imageWidth = sliderWidth / images.length;
//     document.body.style.height = `${sliderWidth - (window.innerWidth - window.innerHeight)}px`;
//   }

//   function animate() {
//     current = parseFloat(lerp(current, target, ease).toFixed(2));
//     setTransform(slider, `translateX(-${current}px)`);
//     animateImages();
//     requestAnimationFrame(animate);
//   }

//   function animateImages() {
//     const ratio = current / imageWidth;
//     let intersectionRatioValue: number;

//     images.forEach((image, idx) => {
//       intersectionRatioValue = ratio - (idx * 0.7);
//       setTransform(image, `translateX(${intersectionRatioValue * 100}px)`);
//     });
//   }
  
//   init();
//   animate();
// }
export function parallaxSlider() {
  // Check if we're in browser environment
  if (typeof window === 'undefined') return;

  const images: HTMLElement[] = Array.from(document.querySelectorAll<HTMLElement>('.parallax-img'));
  const slider = document.querySelector('.parallax-sliders') as HTMLElement;
  const sliderWrapper = document.querySelector('.parallax-slider-wrapper') as HTMLElement;
  
  // If elements don't exist, return early
  if (!slider || !sliderWrapper || images.length === 0) return;

  let sliderWidth: number;
  let imageWidth: number;
  let current = 0;
  let target = 0;
  const ease = 0.05;

  window.addEventListener('resize', init);

  images.forEach((img, idx) => { 
    // Only set default background if none exists
    if (!img.style.backgroundImage || img.style.backgroundImage === 'none') {
      img.style.backgroundImage = `url(/assets/img/project-slider-img/portfolio-slider-5/port-${idx + 1}.jpg)`;
    }
  });

  // Add wheel event listener only if sliderWrapper exists
  sliderWrapper.addEventListener('wheel', (e) => {
    e.preventDefault();
    target += e.deltaY * 0.5;
    
    // Limit target to valid range (need to wait for init to set sliderWidth)
    if (sliderWidth) {
      target = Math.max(0, target);
      target = Math.min(sliderWidth - window.innerWidth, target);
    }
  });

  function lerp(start: number, end: number, t: number): number {
    return start * (1 - t) + end * t;
  }

  function setTransform(el: HTMLElement, transform: string) {
    el.style.transform = transform;
  }

  function init() {
    sliderWidth = slider.getBoundingClientRect().width;
    imageWidth = sliderWidth / images.length;
    document.body.style.height = `${sliderWidth - (window.innerWidth - window.innerHeight)}px`;
  }

  function animate() {
    current = parseFloat(lerp(current, target, ease).toFixed(2));
    setTransform(slider, `translateX(-${current}px)`);
    animateImages();
    requestAnimationFrame(animate);
  }

  function animateImages() {
    const ratio = current / imageWidth;
    let intersectionRatioValue: number;

    images.forEach((image, idx) => {
      intersectionRatioValue = ratio - (idx * 0.7);
      setTransform(image, `translateX(${intersectionRatioValue * 100}px)`);
    });
  }
  
  // Initialize after a small delay to ensure DOM is ready
  setTimeout(() => {
    init();
    animate();
  }, 100);
}