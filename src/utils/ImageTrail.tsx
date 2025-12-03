import { lerp, distance, getPointerPos } from '@/utils/animationUtils';
import React, { useEffect, useRef } from 'react';
import { StaticImageData } from 'next/image';
import { gsap } from 'gsap';

interface ImageTrailProps {
  images: { id: number; src: StaticImageData | string }[];
}

const ImageTrail: React.FC<ImageTrailProps> = ({ images }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });
  const cacheMousePos = useRef({ x: 0, y: 0 });
  const zIndexVal = useRef(1);
  const animationRef = useRef<number | null>(null);
  const imgPosition = useRef(0);
  const activeImagesCount = useRef(0);
  const isIdle = useRef(true);
  const threshold = 80;
  const imageRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Initialize all images as invisible
    gsap.set('.content__img', {
      opacity: 0,
      scale: 0.5
    });

    const handlePointerMove = (ev: MouseEvent | TouchEvent) => {
      if (!container) return;
      mousePos.current = getPointerPos(ev, container);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove as EventListener, { passive: false });

    const showNextImage = () => {
      zIndexVal.current++;
      
      // Select the next image in the sequence
      imgPosition.current = imgPosition.current < images.length - 1 ? imgPosition.current + 1 : 0;
      
      const img = imageRefs.current[imgPosition.current];
      
      if (!img) return;

      // Get the bounding rect of the image
      const rect = img.getBoundingClientRect();
      
      gsap.killTweensOf(img);

      // Update active count
      activeImagesCount.current++;
      isIdle.current = false;

      const timeline = gsap.timeline({
        onComplete: () => {
          activeImagesCount.current--;
          if (activeImagesCount.current === 0) {
            isIdle.current = true;
          }
        }
      });

      // Animate position
      timeline.fromTo(img, {
        opacity: 1,
        scale: 1,
        zIndex: zIndexVal.current,
        x: cacheMousePos.current.x - rect.width / 2,
        y: cacheMousePos.current.y - rect.height / 2
      }, {
        duration: 0.4,
        ease: 'power1',
        x: mousePos.current.x - rect.width / 2,
        y: mousePos.current.y - rect.height / 2
      }, 0)
      // then make it disappear
      .to(img, {
        duration: 0.4,
        ease: 'power3',
        opacity: 0,
        scale: 0.2
      }, 0.4);

      // Move to end of container to maintain order
      container.appendChild(img);
    };

    const animate = () => {
      const dist = distance(
        mousePos.current.x,
        mousePos.current.y,
        lastMousePos.current.x,
        lastMousePos.current.y
      );

      cacheMousePos.current.x = lerp(cacheMousePos.current.x, mousePos.current.x, 0.1);
      cacheMousePos.current.y = lerp(cacheMousePos.current.y, mousePos.current.y, 0.1);

      if (dist > threshold) {
        showNextImage();
        lastMousePos.current = { ...mousePos.current };
      }

      // Reset zIndexVal if all images are idle
      if (isIdle.current && zIndexVal.current !== 1) {
        zIndexVal.current = 1;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize mouse position
    const onPointerMoveEv = () => {
      // Wait for images to load
      setTimeout(() => {
        cacheMousePos.current = { ...mousePos.current };
        animationRef.current = requestAnimationFrame(animate);
      }, 100);
      window.removeEventListener('mousemove', onPointerMoveEv);
    };

    window.addEventListener('mousemove', onPointerMoveEv);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove as EventListener);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (container) {
        gsap.killTweensOf(container);
      }
    };
  }, [images.length]);

  // Add ref to each image
  const addImageRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      imageRefs.current[index] = el;
    }
  };

  return (
    <div ref={containerRef} className="content z-index-2 d-none d-md-block">
      {images.map((image, index) => (
        <div 
          className="content__img" 
          key={image.id}
          ref={(el) => addImageRef(el, index)}
        >
          <div  className="content__img-inner"
            style={{  backgroundImage: `url(${typeof image.src === 'string' ? image.src : image.src.src})`}}/>
        </div>
      ))}
    </div>
  );
};

export default ImageTrail;