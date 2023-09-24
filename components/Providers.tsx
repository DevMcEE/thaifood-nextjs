import { createContext, useEffect, useMemo, useState } from 'react';
import { IWeekdayWorkingData } from './mainPage/mainPage.type';

export const WorkingTimeContext = createContext<{workingTime: IWeekdayWorkingData[]}>({ workingTime: []});

export function Providers({ children }) {
  const [workingTime, set] = useState<IWeekdayWorkingData[]>([]);
  const url = useMemo(() => {
    return `${process.env.NODE_ENV === 'production' ? process.env.apiUrl : process.env.localApiUrl}/resto/v1/working-time`; 
  }, [process.env.NODE_ENV]);

  useEffect(() => {
    fetch(url).then(resp => resp.json()).then((data) => {
      set(data);
    }).catch(error => console.log(error));
  }, [url]);

  return (
    <WorkingTimeContext.Provider value={{ workingTime }}>
      {children}
    </WorkingTimeContext.Provider>
  );
}