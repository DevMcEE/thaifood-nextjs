import { useTranslation } from 'next-i18next';
import workingTime from '../../../assets/workingTime';
import { WorkingTimeService } from "../../../services/workingTime.service";


export const WorkingTime = (): JSX.Element => {
  const { t } = useTranslation();

  const workingTimeService = new WorkingTimeService(workingTime, t);
  const status = workingTimeService.getList();

  return (<>
    {
      status.map(
        (item) => (
          <div key={item.weekdays} style={{ display: 'flex', width: '279px', justifyContent: "space-between", textTransform: 'capitalize', fontWeight: 'bold' }}>
            <p>{`${item.weekdays}: `}</p>
            <p>{` ${item.timeRange === 'closed' ? `${item.timeRange} ${item.comment === '' ? '' : '(' + item.comment + ')'}` : item.timeRange}`}</p>
          </div>
        )
      )
    }
  </>);
}

