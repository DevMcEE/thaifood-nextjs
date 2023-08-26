import { useRef } from 'react';

export const useRefStorage = () => {
  const refCollection = useRef<HTMLElement[]>([]);

  const addToRefs = (element: HTMLElement | null) => {
    if (element && !refCollection.current.includes(element)) {
      refCollection.current.push(element);
    }
  };

  return {refCollection, addToRefs};
}

