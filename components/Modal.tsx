import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MUIModal from '@mui/material/Modal';

interface IModalProps {
  open: boolean,
  toggleOpen: () => void,
  title: string,
  children: JSX.Element
}

export const Modal = ({ open, toggleOpen, title, children }: IModalProps) => {

  return (
    <MUIModal
      open={open}
      onClose={toggleOpen}
      className="modal-container"
    >
      <Box className="modal-content">
        <Typography className="modal-content-title"  variant="h5" component="h3">
          {title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {children}
        </Typography>
      </Box>
    </MUIModal>
  )
}