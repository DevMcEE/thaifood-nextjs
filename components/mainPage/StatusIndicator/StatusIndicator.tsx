import { WorkingTimeService } from "../../../services/workingTime.service";
import { InfoIcon } from "../../../assets/icons/InfoIcon";

const workingTimeService = new WorkingTimeService();

export const StatusIndicator = () => {
  const status = workingTimeService.getStatus();

  return (
    <div className="status-indicator-block">
      <InfoIcon fill={status.statusColor} classes={`status-indicator-block--${status.statusColor}`} />
      <span>{status.message}</span>
    </div>
  )
}