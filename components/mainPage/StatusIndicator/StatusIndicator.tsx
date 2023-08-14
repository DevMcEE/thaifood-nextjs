import { WorkingTimeService } from "../../../services/workingTime.service";
import { InfoIcon } from "../../../assets/icons/InfoIcon";
import { useTranslation } from 'next-i18next';
import workingTime from '../../../assets/workingTime';

export const StatusIndicator = () => {
  const { t } = useTranslation();
  const workingTimeService = new WorkingTimeService(workingTime, t);
  const status = workingTimeService.getStatus();

  return (
    <div className="status-indicator-block">
      <InfoIcon fill={status.statusColor} />
      <span className='status-indicator-block__message'>{status.message}</span>
    </div>
  )
}