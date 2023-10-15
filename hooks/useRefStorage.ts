import { useRef } from 'react';

export const useRefStorage = () => {
  const refCollection = useRef<HTMLAnchorElement[]>([]);

  const addToRefs = (element: HTMLAnchorElement | null) => {
    if (!element) return;

    const existingIndex = refCollection.current.findIndex(item => item.id === element.id);

    if (existingIndex !== -1) {
      refCollection.current[existingIndex] = element;
    } else {
      refCollection.current.push(element);
    }
  };

  return { refCollection, addToRefs };
};
