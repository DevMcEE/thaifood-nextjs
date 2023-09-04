import { useRef } from 'react';

export const useRefStorage = () => {
  const refCollection = useRef<HTMLAnchorElement[]>([]);

  const addToRefs = (element: HTMLAnchorElement | null) => {

    if (element) {
      const existingRefIndex = refCollection.current.findIndex(ref => ref.id === element.id);

      if (existingRefIndex !== -1) {
        refCollection.current.splice(existingRefIndex, 1);
      }

      refCollection.current.push(element);
    }
  };

  return { refCollection, addToRefs };
};