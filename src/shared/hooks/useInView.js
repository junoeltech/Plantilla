import { useEffect, useState } from 'react';

export default function useInView(ref, { root = null, rootMargin = '0px', threshold = 0.15 } = {}) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref?.current) return;
    const node = ref.current;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { root, rootMargin, threshold }
    );

    obs.observe(node);
    return () => obs.disconnect();
  }, [ref, root, rootMargin, threshold]);

  return isVisible;
}
