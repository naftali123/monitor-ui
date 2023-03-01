import Box from '@mui/material/Box/Box';
import { CircularProgress, Dialog, DialogContent, DialogTitle, Grid } from '@mui/material';
import { SimpleModalProps } from './SimpleModalProps';

export function LoadingModal({ onClose, open, title }: SimpleModalProps) {
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title!=='' ? title : 'Please wait...'}</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2} maxWidth={"sm"}>
            {/* <Grid item xs={12} sm={12}>
              <Typography variant="body2">
                
              </Typography>
            </Grid> */}
            <Grid item xs={12} sm={12}>
              <CircularProgress />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
