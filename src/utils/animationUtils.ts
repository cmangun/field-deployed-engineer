// Preload all slider images and ensure they are fully loaded before use
export const preloadImages = (selector: string = '.slide__img'): Promise<void[]> => {
  const images = Array.from(document.querySelectorAll(selector)) as HTMLImageElement[];
  
  return Promise.all(
    images.map(img => {
      if (img.complete) {
        return Promise.resolve();
      }
      
      return new Promise<void>((resolve, reject) => {
        img.addEventListener('load', () => resolve());
        img.addEventListener('error', () => reject(new Error(`Failed to load image: ${img.src}`)));
        
        // Force load if src is set but not loading
        if (img.src && !img.complete) {
          img.src = img.src;
        }
      });
    })
  );
};

// Linear interpolation between two values
export const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;

// Calculate Euclidean distance between two points
export const distance = (x1: number, y1: number, x2: number, y2: number) => {
  return Math.hypot(x2 - x1, y2 - y1);
};

// Get pointer (mouse/touch) position relative to an element
export const getPointerPos = (ev: MouseEvent | TouchEvent, element: HTMLElement) => {
  let posx = 0;
  let posy = 0;

  if ('touches' in ev) {
    if (ev.touches.length > 0) {
      const rect = element.getBoundingClientRect();
      posx = ev.touches[0].clientX - rect.left;
      posy = ev.touches[0].clientY - rect.top;
    }
  } else if ('clientX' in ev) {
    const rect = element.getBoundingClientRect();
    posx = ev.clientX - rect.left;
    posy = ev.clientY - rect.top;
  }

  return { x: posx, y: posy };
};

// Measure distance moved between two mouse positions
export const getMouseDistance = (mousePos: {x: number, y: number}, lastMousePos: {x: number, y: number}) => {
  return distance(mousePos.x, mousePos.y, lastMousePos.x, lastMousePos.y);
};
