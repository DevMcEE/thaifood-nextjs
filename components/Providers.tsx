import { createContext, useEffect, useState } from 'react';
import { IWeekdayWorkingData } from './mainPage/mainPage.type';

export const WorkingTimeContext = createContext<{workingTime: IWeekdayWorkingData[]}>({ workingTime: []});

export function Providers({ children }) {
  const [workingTime, set] = useState<IWeekdayWorkingData[]>([]);
  useEffect(() => {
    fetch('http://localhost:5003/resto/v1/working-time').then(resp => resp.json()).then((data) => {
      set(data);
    });
  }, []);

  return (
    <WorkingTimeContext.Provider value={{ workingTime }}>
      {children}
    </WorkingTimeContext.Provider>
  );
}