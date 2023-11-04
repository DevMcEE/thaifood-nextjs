import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MUIModal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import classnames from 'classnames';
import { useMemo } from 'react';

interface IModalProps {
  isOpen: boolean,
  close: () => void,
  title?: string,
  children: JSX.Element,
  isConstrained?: boolean
}

export const Modal = ({ isOpen, close, title, children, isConstrained = true }: IModalProps) => {
  
  const modalTitle = useMemo(() => {
    if (title) return (
      <Typography className="modal-content-title" variant="h5" component="h3">
        {title}
      </Typography>);
  }, [title]);

  return (
    <MUIModal
      open={isOpen}
      onClose={close}
      className="modal-container"
    >
      <Box className={classnames('modal-content', { 'modal-content--constrained': isConstrained }, { 'modal-content__item-card': !isConstrained })}>
        <IconButton disableFocusRipple={true} className="modal-content-title__icon-button" onClick={close}>
          <CloseIcon />
        </IconButton>
        {modalTitle}
        <Typography component="div" className="modal-content-description">
          {children}
        </Typography>
      </Box>
    </MUIModal>
  );
};