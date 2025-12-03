import { useEffect, useRef } from "react";
import { Observer } from 'gsap/Observer';
import { gsap } from 'gsap';

// Register GSAP plugins
gsap.registerPlugin(Observer);

// Types
type SliderDirection = 'next' | 'prev';

const useSlideshowPortfolio = () => {
    const sliderRef = useRef<HTMLDivElement>(null);
    const sliderBGRef = useRef<HTMLDivElement>(null);
    const sliderFGRef = useRef<HTMLDivElement>(null);
    const titlesRef = useRef<(HTMLDivElement | null)[]>([]);
    const nextBtnRef = useRef<HTMLButtonElement>(null);
    const prevBtnRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!sliderRef.current) return;

        // Store current values in variables for cleanup
        const nextBtnElement = nextBtnRef.current;
        const prevBtnElement = prevBtnRef.current;

        class Slider {
            private _current = 0;
            isAnimating = false;
            element: HTMLElement;
            reverseDirection: boolean;
            items: HTMLElement[];
            itemsInner: (HTMLElement | null)[];
            itemsTotal: number;

            constructor(element: HTMLElement, reverseDirection = false) {
                this.element = element;
                this.reverseDirection = reverseDirection;
                this.items = [...element.querySelectorAll<HTMLElement>('.tp-portfolio-slider__item')];
                this.itemsInner = this.items.map(item =>
                    item.querySelector<HTMLElement>('.tp-portfolio-slider__item-inner')
                );
                this.items[this.current].classList.add('current');
                this.itemsTotal = this.items.length;
                gsap.set([...this.items, ...this.itemsInner.filter(Boolean)], { 'will-change': 'transform' });
            }

            get current(): number {
                return this._current;
            }

            set current(value: number) {
                this._current = value;
            }

            next(): void {
                this.navigate(1);
            }

            prev(): void {
                this.navigate(-1);
            }

            navigate(direction: number): void {
                if (this.isAnimating) return;
                this.isAnimating = true;

                const previous = this.current;
                this.current = direction === 1 ?
                    this.current < this.itemsTotal - 1 ? this.current + 1 : 0 :
                    this.current > 0 ? this.current - 1 : this.itemsTotal - 1;

                const currentItem = this.items[previous];
                const currentInner = this.itemsInner[previous];
                const upcomingItem = this.items[this.current];
                const upcomingInner = this.itemsInner[this.current];

                if (!currentItem || !upcomingItem || !currentInner || !upcomingInner) return;

                gsap.timeline({
                    defaults: { duration: 1.1, ease: 'power3.inOut' },
                    onComplete: () => {
                        this.items[previous].classList.remove('current');
                        this.items[this.current].classList.add('current');
                        this.isAnimating = false;
                    }
                })
                    .to(currentItem, {
                        xPercent: this.reverseDirection ? direction * 100 : -direction * 100,
                        onComplete: () => {
                            gsap.set(currentItem, { opacity: 0 });
                        }
                    })
                    .to(currentInner, {
                        xPercent: this.reverseDirection ? -direction * 30 : direction * 30,
                        startAt: { rotation: 0 },
                        rotation: -direction * 20,
                        scaleX: 2.8
                    }, 0)
                    .to(upcomingItem, {
                        startAt: {
                            opacity: 1,
                            xPercent: this.reverseDirection ? -direction * 80 : direction * 80
                        },
                        xPercent: 0
                    }, 0)
                    .to(upcomingInner, {
                        startAt: {
                            xPercent: this.reverseDirection ? direction * 30 : -direction * 30,
                            scaleX: 2.8,
                            rotation: direction * 20
                        },
                        xPercent: 0,
                        scaleX: 1,
                        rotation: 0
                    }, 0);
            }
        }

        // Initialize sliders
        if (!sliderBGRef.current || !sliderFGRef.current) return;
        const sliderBG = new Slider(sliderBGRef.current);
        const sliderFG = new Slider(sliderFGRef.current, true);

        // Initialize titles
        const titles = titlesRef.current.filter(Boolean) as HTMLDivElement[];
        if (titles.length === 0) return;

        titles[0].classList.add('type__item--current');

        // Text splitting implementation
        titles.forEach((title) => {
            // Clear existing content
            const h4 = title.querySelector('h4');
            if (!h4) return;
            
            const link = h4.querySelector('a');
            if (!link) return;
            
            const text = link.textContent || '';
            link.innerHTML = '';
            
            // Split into words and characters
            const words = text.split(' ');
            words.forEach((word, wordIndex) => {
                const wordSpan = document.createElement('span');
                wordSpan.className = 'word';
                wordSpan.setAttribute('data-word', word);
                wordSpan.style.setProperty('--word-index', wordIndex.toString());
                
                // Split word into characters
                const chars = word.split('');
                chars.forEach((char, charIndex) => {
                    const charWrap = document.createElement('span');
                    charWrap.className = 'char-wrap';
                    
                    const charSpan = document.createElement('span');
                    charSpan.className = 'char';
                    charSpan.setAttribute('data-char', char);
                    charSpan.style.setProperty('--char-index', charIndex.toString());
                    charSpan.textContent = char;
                    
                    charWrap.appendChild(charSpan);
                    wordSpan.appendChild(charWrap);
                });
                
                link.appendChild(wordSpan);
                
                // Add space between words (except after last word)
                if (wordIndex < words.length - 1) {
                    const space = document.createTextNode(' ');
                    link.appendChild(space);
                }
            });
            
            // Set CSS variables
            title.style.setProperty('--word-total', words.length.toString());
            title.style.setProperty('--char-total', text.replace(/\s/g, '').length.toString());
            title.classList.add('words', 'chars', 'splitting');
            title.setAttribute('data-splitting', '');
        });

        gsap.set(titles, { 'will-change': 'transform' });

        // Navigation handler
        const navigate = (action: SliderDirection): void => {
            toggleTitle(action);
            sliderBG[action]();
            sliderFG[action]();
        };

        // Title animation
        const toggleTitle = (action: SliderDirection): void => {
            if (sliderBG.isAnimating) return;

            const current = sliderBG.current;
            const upcoming = action === 'next' ?
                current < sliderBG.itemsTotal - 1 ? current + 1 : 0 :
                current > 0 ? current - 1 : sliderBG.itemsTotal - 1;

            const titleCurrent = titles[current];
            const titleUpcoming = titles[upcoming];

            if (!titleCurrent || !titleUpcoming) return;

            const duration = 1.1;
            const reverse = action === 'next' ? -1 : 1;

            gsap.timeline({
                defaults: { duration: duration, ease: 'power4.inOut' },
                onStart: () => {
                    titleUpcoming.classList.add('type__item--current');
                },
                onComplete: () => {
                    titleCurrent.classList.remove('type__item--current');
                }
            })
            .to(titleCurrent, {
                xPercent: reverse * 40,
                opacity: 0
            })
            .to(titleCurrent.querySelectorAll('.char'), {
                xPercent: reverse * 103,
            }, 0)
            .addLabel('in', duration * 0.15)
            .fromTo(titleUpcoming, {
                xPercent: reverse * -40,
                opacity: 0
            }, {
                xPercent: 0,
                opacity: 1
            }, 'in')
            .fromTo(titleUpcoming.querySelectorAll('.char'), {
                xPercent: reverse * -103
            }, {
                xPercent: 0
            }, 'in');
        };

        // Event listeners
        const handleNext = () => navigate('next');
        const handlePrev = () => navigate('prev');

        nextBtnElement?.addEventListener('click', handleNext);
        prevBtnElement?.addEventListener('click', handlePrev);

        // Improved Observer for wheel/touch events
        let isScrolling = false;
        const observer = Observer.create({
            target: window,
            type: "wheel,touch,scroll,pointer",
            onUp: () => {
                if (!isScrolling) {
                    isScrolling = true;
                    navigate('next');
                    setTimeout(() => isScrolling = false, 1000);
                }
            },
            onDown: () => {
                if (!isScrolling) {
                    isScrolling = true;
                    navigate('prev');
                    setTimeout(() => isScrolling = false, 1000);
                }
            },
            wheelSpeed: -1,
            tolerance: 50,
            preventDefault: true
        });

        return () => {
            // Use the stored variables in cleanup
            nextBtnElement?.removeEventListener('click', handleNext);
            prevBtnElement?.removeEventListener('click', handlePrev);
            observer.kill();
        };
    }, []);

    return {
        sliderRef,
        sliderBGRef,
        sliderFGRef,
        titlesRef,
        nextBtnRef,
        prevBtnRef
    };
};

export default useSlideshowPortfolio;