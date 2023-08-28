import { useRef } from 'react';

export const useRefStorage = () => {
  const refCollection = useRef<HTMLAnchorElement[]>([]);

  const addToRefs = (element: HTMLAnchorElement | null) => {
    if (element && !refCollection.current.includes(element)) {
      refCollection.current.push(element);
    }
  };

  return {refCollection, addToRefs};
}