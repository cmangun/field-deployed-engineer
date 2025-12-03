// types/hover-effect.d.ts
declare module 'hover-effect' {
  interface HoverEffectOptions {
    parent: HTMLElement;
    intensity?: number;
    speedIn?: number;
    speedOut?: number;
    easing?: string;
    image1: string;
    image2: string;
    displacementImage: string;
    imagesRatio: number;
    hover?: boolean;
  }

  class HoverEffect {
    constructor(options: HoverEffectOptions);
    next(): void;
    previous(): void;
    destroy(): void;
  }

  export = HoverEffect;
}