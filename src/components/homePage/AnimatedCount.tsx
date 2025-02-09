import { useState, useEffect, useRef } from 'react';

const AnimatedCount = ({ count }: { count: number }) => {
  const [displayCount, setDisplayCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const end = count;
      const duration = 2000; // duration of the animation in ms
      const incrementTime = 50; // time between each increment in ms
      const step = (end - start) / (duration / incrementTime);

      const timer = setInterval(() => {
        start += step;
        if (start >= end) {
          clearInterval(timer);
          start = end;
        }
        setDisplayCount(Math.floor(start));
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isVisible, count]);

  return (
    <div ref={ref}>
      <p className="text-3xl md:text-5xl font-bold">{displayCount}</p>
    </div>
  );
};

export default AnimatedCount;