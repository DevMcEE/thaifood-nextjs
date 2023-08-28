import { useTranslation } from 'next-i18next';
import workingTime from '../../assets/workingTime';
import { WorkingTimeService } from "../../services/workingTime.service";
import { useEffect, useState } from 'react';
import { IWorkingTime } from '../mainPage/mainPage.type';


export const WorkingTime = (): JSX.Element => {
  const { t } = useTranslation();

  const [status, setStatus] = useState<IWorkingTime[]>([]);

  useEffect(() => {
    const workingTimeService = new WorkingTimeService(workingTime, t);
    setStatus(() => workingTimeService.getList());
  }, [t]);

  return (<div className='working-time'>
    {
      status.map(
        (item) => (
          <div key={item.weekdays} className="working-time-record">
            <p >{`${item.weekdays}: `}</p>
            <p> {`${item.timeRange}${item.comment && item.timeRange === 'closed' ? ` (${ item.comment })` : '' }`}</p>
          </div>
        )
      )
    }
  </div>);
}

