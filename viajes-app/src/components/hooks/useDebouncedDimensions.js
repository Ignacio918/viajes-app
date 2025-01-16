import { useState, useEffect, useCallback } from 'react';

const useDebouncedDimensions = (ref, delay = 300) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const updateDimensions = useCallback(() => {
    if (ref.current) {
      setDimensions({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }
  }, [ref]);

  useEffect(() => {
    const handleResize = () => {
      setTimeout(updateDimensions, delay);
    };

    window.addEventListener('resize', handleResize);
    updateDimensions();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [updateDimensions, delay]);

  return dimensions;
};

export { useDebouncedDimensions };