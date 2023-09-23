import { useTranslation } from 'next-i18next';
// import workingTime from '../../assets/workingTime';
import { WorkingTimeService } from '../../services/workingTime.service';
import { useContext, useEffect, useState } from 'react';
import { IWorkingTime } from '../mainPage/mainPage.type';
import { WorkingTimeContext } from '../Providers';


export const WorkingTime = (): JSX.Element => {
  const { workingTime } = useContext(WorkingTimeContext);

  const { t } = useTranslation();

  const [status, setStatus] = useState<IWorkingTime[]>([]);

  useEffect(() => {
    const workingTimeService = new WorkingTimeService(workingTime, t);
    setStatus(() => workingTimeService.getList());
  }, [workingTime]);

  return (<div className="working-time">
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
};

