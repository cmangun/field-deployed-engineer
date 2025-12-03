"use client"

import { RefObject, useEffect } from 'react';
import { gsap } from 'gsap';

export const useTextAnimation =  <T extends HTMLElement>(ref: RefObject<T | null>) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Split text into letters
    const splitText = (el: HTMLElement) => {
      const textNodes: Node[] = [];
      el.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent?.split(' ').forEach((word, index, array) => {
            const wordSpan = document.createElement('span');
            wordSpan.classList.add('tp-word-span');
            word.split('').forEach(letter => {
              const letterSpan = document.createElement('span');
              letterSpan.classList.add('tp-letter-span');
              letterSpan.textContent = letter;
              wordSpan.appendChild(letterSpan);
            });
            textNodes.push(wordSpan);
            if (index < array.length - 1) {
              textNodes.push(document.createTextNode(' '));
            }
          });
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          textNodes.push(node.cloneNode(true));
        }
      });
      el.innerHTML = '';
      textNodes.forEach(node => el.appendChild(node));
      return el;
    };

    // Add hover effects to letters
    const addHoverEffects = (el: HTMLElement) => {
      const letters = el.querySelectorAll('.tp-letter-span');
      const cleanupFns: (() => void)[] = [];
      
      letters.forEach(letter => {
        const onEnter = () => {
          gsap.to(letter, {
            scaleY: 1.3,
            y: '10%',
            duration: 0.2,
            ease: 'sine'
          });
        };

        const onLeave = () => {
          gsap.to(letter, {
            scaleY: 1,
            y: '0%',
            duration: 0.2,
            ease: 'sine'
          });
        };

        letter.addEventListener('mouseenter', onEnter);
        letter.addEventListener('mouseleave', onLeave);

        cleanupFns.push(() => {
          letter.removeEventListener('mouseenter', onEnter);
          letter.removeEventListener('mouseleave', onLeave);
        });
      });

      return cleanupFns;
    };

    const animatedElement = splitText(element);
    const cleanupFns = addHoverEffects(animatedElement);

    return () => {
      cleanupFns.forEach(cleanup => cleanup());
    };
  }, [ref]);
};