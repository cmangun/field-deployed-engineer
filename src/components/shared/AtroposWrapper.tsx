'use client';

import React, { ReactNode, useEffect, useRef, HTMLAttributes, FC } from 'react';
import Atropos from 'atropos';

interface PropsDT extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const AtroposWrapper: FC<PropsDT> = ({ children, className = '', ...props }) => {
  const atroposRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!atroposRef.current) return;

    const atropos = Atropos({
      el: atroposRef.current,
      activeOffset: 40,
      shadowScale: 1.05,
      rotateXMax: 20,
      rotateYMax: 20,
      duration: 400,
    });

    return () => {
      atropos.destroy();
    };
  }, []);

  return (
    <div
      ref={atroposRef}
      className={`my-atropos atropos-rotate-touch ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default AtroposWrapper;
