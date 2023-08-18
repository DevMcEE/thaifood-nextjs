import { WorkingTimeService } from "../../../services/workingTime.service";
import { InfoIcon } from "../../../assets/icons/InfoIcon";
import { useTranslation } from 'next-i18next';
import workingTime from '../../../assets/workingTime';
import { WorkingStatusService } from "../../../services/workingStatus.service";

export const StatusIndicator = () => {
  const { t } = useTranslation();
  const workingStatusService = new WorkingStatusService(workingTime, t);
  const status = workingStatusService.getStatus();

  return (
    <div className="status-indicator-block">
      <InfoIcon fill={status.statusColor} />
      <span className='status-indicator-block__message'>{status.comment}</span>
    </div>
  )
}