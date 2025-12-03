import { useEffect, useRef, useCallback } from 'react';
import HoverEffect from 'hover-effect';
import { StaticImageData } from 'next/image';
import { usePathname } from 'next/navigation';

export const useHoverEffect = () => {
  const hoverItemsRef = useRef<HTMLDivElement[]>([]);
  const animationsRef = useRef<HoverEffect[]>([]);
  const pathname = usePathname();

  const initializeHoverEffects = useCallback(async () => {
    try {
      // Clean up previous animations
      animationsRef.current.forEach(animation => {
        try {
          if (typeof animation.destroy === 'function') {
            animation.destroy();
          }
        } catch (error) {
          console.warn('Error cleaning up hover effect:', error);
        }
      });
      animationsRef.current = [];

      const { default: HoverEffect } = await import('hover-effect');

      // Filter out null elements
      const validItems = hoverItemsRef.current.filter(item => item !== null);

      for (const item of validItems) {
        const hoverImg = item.querySelector('.tp--hover-img') as HTMLElement;
        const img = item.querySelector('img') as HTMLImageElement;

        if (!hoverImg || !img) continue;

        // Check if image is already loaded
        if (!img.complete) {
          await new Promise<void>((resolve) => {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          });
        }

        const animation = new HoverEffect({
          parent: hoverImg,
          intensity: parseFloat(hoverImg.dataset.intensity || '0.6'),
          speedIn: parseFloat(hoverImg.dataset.speedin || '1'),
          speedOut: parseFloat(hoverImg.dataset.speedout || '1'),
          easing: hoverImg.dataset.easing,
          image1: img.src,
          image2: img.src,
          displacementImage: hoverImg.dataset.displacement || '',
          imagesRatio: img.naturalHeight / img.naturalWidth,
          hover: false
        });

        animationsRef.current.push(animation);

        const parentItem = item.closest('.tp--hover-item');
        if (parentItem) {
          const handleMouseEnter = () => animation.next();
          const handleMouseLeave = () => animation.previous();
          
          parentItem.addEventListener('mouseenter', handleMouseEnter);
          parentItem.addEventListener('mouseleave', handleMouseLeave);

          // Store event listeners for cleanup
          item.dataset.mouseEnter = handleMouseEnter.toString();
          item.dataset.mouseLeave = handleMouseLeave.toString();
        }
      }
    } catch (error) {
      console.error('Error initializing hover effects:', error);
    }
  }, []);

  useEffect(() => {
    // Store current ref values in variables for cleanup
    const currentHoverItems = [...hoverItemsRef.current];
    const currentAnimations = [...animationsRef.current];

    const initHoverEffects = async () => {
      // Wait a bit for the DOM to be fully updated
      await new Promise(resolve => setTimeout(resolve, 100));
      await initializeHoverEffects();
    };

    initHoverEffects();

    return () => {
      // Cleanup animations
      currentAnimations.forEach(animation => {
        try {
          if (typeof animation.destroy === 'function') {
            animation.destroy();
          }
        } catch (error) {
          console.warn('Error cleaning up hover effect:', error);
        }
      });
      animationsRef.current = [];

      // Cleanup event listeners using the stored ref values
      currentHoverItems.forEach(item => {
        if (!item) return;
        
        const parentItem = item.closest('.tp--hover-item');
        if (parentItem) {
          // Remove event listeners using the stored function references
          if (item.dataset.mouseEnter) {
            const mouseEnterHandler = eval(item.dataset.mouseEnter);
            parentItem.removeEventListener('mouseenter', mouseEnterHandler);
          }
          if (item.dataset.mouseLeave) {
            const mouseLeaveHandler = eval(item.dataset.mouseLeave);
            parentItem.removeEventListener('mouseleave', mouseLeaveHandler);
          }
          
          // Clean up the data attributes
          delete item.dataset.mouseEnter;
          delete item.dataset.mouseLeave;
        }
      });
    };
  }, [initializeHoverEffects, pathname]);

  const addToRefs = useCallback((el: HTMLDivElement | null) => {
    if (el && !hoverItemsRef.current.includes(el)) {
      hoverItemsRef.current.push(el);
    }
  }, []);

  return { addToRefs };
};


interface HoverEffectOptions {
  parent: HTMLElement;
  intensity?: number;
  speedIn?: number;
  speedOut?: number;
  easing?: string;
  hover?: boolean;
  image1: string;
  image2: string;
  displacementImage: string;
  imagesRatio: number;
}

export const useHoverEffectTwo = (
  containerRef: React.RefObject<HTMLElement | null>,
  imageSrc: string | StaticImageData
) => {
  const hoverEffectRef = useRef<HoverEffect | null>(null);
  const eventListenersRef = useRef<{
    mouseEnter?: () => void;
    mouseLeave?: () => void;
  }>({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const images = container.querySelectorAll('img');
    const firstImage = images[0];
    if (!firstImage) return;

    const initHoverEffect = () => {
      const src = typeof imageSrc === 'string' ? imageSrc : imageSrc.src;
      if (!src) return;

      try {
        const options: HoverEffectOptions = {
          parent: container,
          intensity: 0.6,
          speedIn: 1,
          speedOut: 1,
          hover: false,
          image1: src,
          image2: src,
          displacementImage: '/assets/img/fluid.jpg',
          imagesRatio: firstImage.height / firstImage.width,
        };

        hoverEffectRef.current = new HoverEffect(options);

        const hoverItem = container.closest('.tp--hover-item');
        if (!hoverItem) return;

        // Store event handlers in ref
        eventListenersRef.current.mouseEnter = () => hoverEffectRef.current?.next();
        eventListenersRef.current.mouseLeave = () => hoverEffectRef.current?.previous();

        if (eventListenersRef.current.mouseEnter && eventListenersRef.current.mouseLeave) {
          hoverItem.addEventListener('mouseenter', eventListenersRef.current.mouseEnter);
          hoverItem.addEventListener('mouseleave', eventListenersRef.current.mouseLeave);
        }

      } catch (error) {
        console.error('Error initializing hover effect:', error);
      }
    };

    const cleanup = () => {
      const hoverItem = container.closest('.tp--hover-item');
      if (hoverItem && eventListenersRef.current.mouseEnter && eventListenersRef.current.mouseLeave) {
        hoverItem.removeEventListener('mouseenter', eventListenersRef.current.mouseEnter);
        hoverItem.removeEventListener('mouseleave', eventListenersRef.current.mouseLeave);
      }

      if (hoverEffectRef.current) {
        try {
          // Check if destroy method exists before calling
          if (typeof hoverEffectRef.current.destroy === 'function') {
            hoverEffectRef.current.destroy();
          }
          hoverEffectRef.current = null;
        } catch (error) {
          console.error('Error cleaning up hover effect:', error);
        }
      }
    };

    if (firstImage.complete) {
      initHoverEffect();
    } else {
      const handleLoad = () => initHoverEffect();
      firstImage.addEventListener('load', handleLoad);
      
      return () => {
        firstImage.removeEventListener('load', handleLoad);
        cleanup();
      };
    }

    return cleanup;
  }, [containerRef, imageSrc]);
};