import React, { useMemo, useRef } from 'react';
import { useDebouncedDimensions } from '@/components/hooks/useDebouncedDimensions';
import './AnimatedGradient.css';

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

interface AnimatedGradientProps {
  color?: string;
  blur?: 'light' | 'medium' | 'heavy';
}

interface CustomCSSProperties extends React.CSSProperties {
  '--background-gradient-speed'?: string;
  '--tx-1'?: number;
  '--ty-1'?: number;
  '--tx-2'?: number;
  '--ty-2'?: number;
  '--tx-3'?: number;
  '--ty-3'?: number;
  '--tx-4'?: number;
  '--ty-4'?: number;
}

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({ color = '#E61C5D', blur = 'light' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useDebouncedDimensions(containerRef);

  const circleSize = useMemo(() => Math.max(dimensions.width, dimensions.height), [dimensions.width, dimensions.height]);

  const blurClass = 
    blur === 'light' ? 'blur-light' : 
    blur === 'medium' ? 'blur-medium' : 
    'blur-heavy';

  return (
    <div ref={containerRef} className="animated-gradient-container">
      <div className={`absolute inset-0 ${blurClass}`}>
        {[...Array(4)].map((_, index) => (
          <svg
            key={index}
            className="animated-gradient-svg animate-background-gradient"
            style={{
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 50}%`,
              '--background-gradient-speed': `10s`,
              '--tx-1': Math.random() - 0.5,
              '--ty-1': Math.random() - 0.5,
              '--tx-2': Math.random() - 0.5,
              '--ty-2': Math.random() - 0.5,
              '--tx-3': Math.random() - 0.5,
              '--ty-3': Math.random() - 0.5,
              '--tx-4': Math.random() - 0.5,
              '--ty-4': Math.random() - 0.5,
            } as CustomCSSProperties}
            width={circleSize * randomInt(0.5, 1.5)}
            height={circleSize * randomInt(0.5, 1.5)}
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="50"
              fill={color}
              className="opacity-30 dark:opacity-[0.15]"
            />
          </svg>
        ))}
      </div>
    </div>
  );
};

export { AnimatedGradient };