"use client";

import { useEffect, useRef, useState } from 'react';

const useAutoPlayVideo = (videoSrc: string) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Video Setup
    video.muted = true;
    video.loop = true;
    video.playsInline = true;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Autoplay Strategy
    const playVideo = () => {
      const playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Autoplay started successfully');
          })
          .catch(error => {
            console.log('Autoplay prevented:', error);
            // Try again after user interaction
            const handleInteraction = () => {
              video.play();
              document.removeEventListener('click', handleInteraction);
              document.removeEventListener('touchstart', handleInteraction);
            };
            document.addEventListener('click', handleInteraction);
            document.addEventListener('touchstart', handleInteraction);
          });
      }
    };

    // Video visibility check with Intersection Observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            playVideo();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      observer.disconnect();
    };
  }, [videoSrc]);

  return {
    videoRef,
    isPlaying
  };
};

export default useAutoPlayVideo;