import { useEffect, useRef } from 'react';

export const useParallax = () => {
  const requestRef = useRef();
  const elementsRef = useRef([]);

  const log = (message) => {
    if (process.env.NODE_ENV === 'development') {
      console.log("Parallax Scroll / " + message);
    }
  };

  const animate = () => {
    const scroll = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    elementsRef.current.forEach((el) => {
      if (!el) return;
      
      const dataParallax = el.dataset.parallax;
      if (!dataParallax) return;
      
      try {
        const data = JSON.parse(dataParallax);
        const scrollFrom = data["from-scroll"] || Math.max(0, el.getBoundingClientRect().top + scroll - windowHeight);
        const scrollDistance = data["distance"] || (data["to-scroll"] ? data["to-scroll"] - scrollFrom : windowHeight);
        const scrollTo = scrollFrom + scrollDistance;
        const smoothness = data["smoothness"] || 10;
        
        let scrollCurrent = Math.max(Math.min(scroll, scrollTo), scrollFrom);
        
        const properties = {};
        ['x', 'y', 'z', 'rotateX', 'rotateY', 'rotateZ', 'scaleX', 'scaleY', 'scaleZ', 'scale'].forEach((prop) => {
          if (data[prop] !== undefined) {
            const defaultProp = prop.includes('scale') ? 1 : 0;
            const to = prop.includes('scale') ? parseFloat(data[prop]) : parseInt(data[prop]);
            const next = ((to - defaultProp) * ((scrollCurrent - scrollFrom) / (scrollTo - scrollFrom))) + defaultProp;
            
            const prev = parseFloat(el.dataset[`_${prop}`]) || defaultProp;
            const val = prev + (next - prev) / smoothness;
            
            properties[prop] = Math.ceil(val * 1000) / 1000;
            el.dataset[`_${prop}`] = properties[prop];
          }
        });

        if (Object.keys(properties).length > 0) {
          if (properties["z"] !== undefined) {
            const perspective = data["perspective"] || 800;
            const parent = el.parentElement;
            parent.style.perspective = `${perspective}px`;
            parent.style.webkitPerspective = `${perspective}px`;
          }

          const scaleX = properties["scaleX"] || (properties["scale"] ? properties["scale"] : 1);
          const scaleY = properties["scaleY"] || (properties["scale"] ? properties["scale"] : 1);
          const scaleZ = properties["scaleZ"] || (properties["scale"] ? properties["scale"] : 1);

          const translate3d = `translate3d(${properties["x"] || 0}px, ${properties["y"] || 0}px, ${properties["z"] || 0}px)`;
          const rotate3d = `rotateX(${properties["rotateX"] || 0}deg) rotateY(${properties["rotateY"] || 0}deg) rotateZ(${properties["rotateZ"] || 0}deg)`;
          const scale3d = `scaleX(${scaleX}) scaleY(${scaleY}) scaleZ(${scaleZ})`;
          
          const cssTransform = `${translate3d} ${rotate3d} ${scale3d}`;
          el.style.transform = cssTransform;
          el.style.webkitTransform = cssTransform;
        }
      } catch (e) {
        log(`Error processing element: ${e.message}`);
      }
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    // Initialize elements
    elementsRef.current = Array.from(document.querySelectorAll('[data-parallax]'));
    
    // Start animation
    requestRef.current = requestAnimationFrame(animate);
    
    // Cleanup
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { elementsRef };
};