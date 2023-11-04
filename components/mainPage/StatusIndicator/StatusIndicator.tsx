import { InfoIcon } from '../../../assets/icons/InfoIcon';
import { useTranslation } from 'next-i18next';
import { WorkingStatusService } from '../../../services/workingStatus.service';
import { Modal } from '../../Modal';
import { WorkingTime } from '../../WorkingTime/WorkingTime';
import { useContext, useEffect, useState } from 'react';
import { IWorkingStatus } from '../mainPage.type';
import { WorkingTimeContext } from '../../Providers';
import workingTime from '../../../__mocks__/dataSets/workingTime';

export const StatusIndicator = () => {
  const { t } = useTranslation();
  const { workingTime } = useContext(WorkingTimeContext);

  const [status, setStatus] = useState<IWorkingStatus>();
  const [open, setOpen] = useState(true);

  const handleOpen = () => setOpen(prev => !prev);
  const handleClose = () => setOpen(() => false);
  
  useEffect(() => {
    if (workingTime.length) {
      const workingStatusService = new WorkingStatusService(workingTime, t);
      setStatus(()=> workingStatusService.getStatus());
    }
  }, [workingTime.length]);

  if (!status) {
    return <></>;
  }

  return (
    <div className="status-indicator-block"  onClick={handleOpen}>
      <InfoIcon fill={status.statusColor}/>
      <span className="status-indicator-block__message">{status.comment}</span>
      <Modal isOpen={!open} title={t('Working Time')} close={handleClose}><WorkingTime/></Modal>
    </div>
  );
};