declare module 'src/components/hooks/useDebouncedDimensions' {
    import { RefObject } from 'react';
  
    export function useDebouncedDimensions(ref: RefObject<HTMLElement>, delay?: number): { width: number; height: number; };
  }