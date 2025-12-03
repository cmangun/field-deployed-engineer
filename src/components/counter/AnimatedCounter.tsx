"use client";
import React, { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
    min?: number;
    max: number;
    duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ 
    min = 0, 
    max, 
    duration = 2000 
}) => {
    const [count, setCount] = useState(min);
    const [hasAnimated, setHasAnimated] = useState(false);
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (hasAnimated) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true);
                        
                        const startTime = Date.now();
                        const animate = () => {
                            const elapsed = Date.now() - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            
                            // Ease out cubic
                            const eased = 1 - Math.pow(1 - progress, 3);
                            const currentValue = Math.floor(min + (max - min) * eased);
                            
                            setCount(currentValue);
                            
                            if (progress < 1) {
                                requestAnimationFrame(animate);
                            } else {
                                setCount(max);
                            }
                        };
                        
                        requestAnimationFrame(animate);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [min, max, duration, hasAnimated]);

    return <span ref={ref}>{count}</span>;
};

export default AnimatedCounter;
