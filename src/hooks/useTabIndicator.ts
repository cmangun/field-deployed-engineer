import { useEffect, useRef } from 'react';

const useTabIndicator = (markerId: string = 'lineMarker') => {
  const markerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !markerRef.current) return;

    const marker = markerRef.current;
    const tabButtons = document.querySelectorAll<HTMLButtonElement>('.tp-marker-tab ul li button');

    const updateIndicator = (target: HTMLElement) => {
      if (!target) return;
      
      // Get exact width without padding (matches jQuery behavior)
      const width = target.offsetWidth;
      
      marker.style.left = `${target.offsetLeft}px`;
      marker.style.width = `${width}px`;
      marker.style.display = 'block';
    };

    // Initialize with active tab
    const activeTab = document.querySelector<HTMLButtonElement>('.tp-marker-tab ul li button.active');
    if (activeTab) {
      // Get exact measurements like jQuery
      const width = activeTab.offsetWidth;
      
      marker.style.display = 'block';
      marker.style.width = `${width}px`;
      marker.style.left = `${activeTab.offsetLeft}px`;
    }

    // Add click handlers
    const handleClick = (e: MouseEvent) => {
      const target = e.currentTarget as HTMLElement;
      updateIndicator(target);
    };

    tabButtons.forEach(button => {
      button.addEventListener('click', handleClick);
    });

    // Cleanup
    return () => {
      tabButtons.forEach(button => {
        button.removeEventListener('click', handleClick);
      });
    };
  }, [markerId]);

  return markerRef;
};

export default useTabIndicator;