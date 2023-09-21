import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MUIModal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface IModalProps {
  isOpen: boolean,
  close: () => void,
  title: string,
  children: JSX.Element
}

export const Modal = ({ isOpen, close, title, children }: IModalProps) => {
  return (
    <MUIModal
      open={isOpen}
      onClose={close}
      className="modal-container"
    >
      <Box className="modal-content">
        <Typography className="modal-content-title" variant="h5" component="h3">
          {title} 
          <IconButton disableFocusRipple={true} className="modal-content-title__icon-button" onClick={close}>
            <CloseIcon />
          </IconButton>
        </Typography>
        <Typography component="div" id="modal-modal-description" sx={{ mt: 2 }}>
          {children}
        </Typography>
      </Box>
    </MUIModal>
  );
};