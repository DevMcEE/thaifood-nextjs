import { useRef } from 'react';

export const useRefStorage = () => {
  const refCollection = useRef<HTMLAnchorElement[]>([]);

  const addToRefs = (element: HTMLAnchorElement | null) => {

    if (element && !refCollection.current.find(item => item.id === element.id)) {
      refCollection.current.push(element);
    }
  };

  return { refCollection, addToRefs };
};