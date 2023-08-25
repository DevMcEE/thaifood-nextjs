import { WorkingTimeService } from "../../../services/workingTime.service";
import { InfoIcon } from "../../../assets/icons/InfoIcon";
import { useTranslation } from 'next-i18next';
import workingTime from '../../../assets/workingTime';
import { WorkingStatusService } from "../../../services/workingStatus.service";
import { Modal } from "../../Modal";
import { WorkingTime } from "../../FooterBlock/WorkingTime/WorkingTime";
import { useState } from "react";



export const StatusIndicator = () => {
  const { t } = useTranslation();
  const workingStatusService = new WorkingStatusService(workingTime, t);
  const status = workingStatusService.getStatus();
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((open) => !open)
  return (
    <div className="status-indicator-block">
      <InfoIcon fill={status.statusColor}/>
      <span className='status-indicator-block__message' onClick={toggleOpen}>{status.comment}</span>
      <Modal open={open} title={t('Working Time')} toggleOpen = {toggleOpen}><WorkingTime/></Modal>
    </div>
  )
}