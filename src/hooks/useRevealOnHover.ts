import { useCallback, useEffect } from 'react';

export function useMouseImageReveal() {
  const moveImage = useCallback((
    e: React.MouseEvent,
    item: HTMLElement
  ) => {
    const contentElement = item.querySelector('.tp-award-box-left') as HTMLElement;
    const revealElement = item.querySelector('.tp-award-reveal-img') as HTMLElement;
    
    if (contentElement && revealElement) {
      const contentRect = contentElement.getBoundingClientRect();
      const x = e.clientX - contentRect.left;
      const y = e.clientY - contentRect.top;

      revealElement.style.transform = `translate(${x - revealElement.offsetWidth/2}px, ${y - revealElement.offsetHeight/2}px)`;
    }
  }, []);

  const handleMouseMove = useCallback((
    e: React.MouseEvent,
    selector: string
  ) => {
    const hoverItem = e.currentTarget.closest(selector) as HTMLElement;
    if (hoverItem) {
      moveImage(e, hoverItem);
    }
  }, [moveImage]);

  return {
    handleMouseMove,
  };
}


// design agency light award animation

export const useImageHoverReveal = () => {
  useEffect(() => {
    // Only run this effect on client side
    if (typeof window === 'undefined') return;

    const hoverItems = document.querySelectorAll<HTMLElement>(".hover-reveal-item");
    
    const moveImage = (e: MouseEvent, item: HTMLElement) => {
      const rect = item.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Using children[1] as in your original version
      const image = item.children[1] as HTMLElement;
      if (image) {
        image.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    // Properly typed event listener
    const handleMouseMove = (e: Event) => {
      moveImage(e as MouseEvent, e.currentTarget as HTMLElement);
    };

    hoverItems.forEach((item) => {
      item.addEventListener("mousemove", handleMouseMove as EventListener);
    });

    return () => {
      hoverItems.forEach((item) => {
        item.removeEventListener("mousemove", handleMouseMove as EventListener);
      });
    };
  }, []);
};

