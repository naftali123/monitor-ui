import Box from '@mui/material/Box/Box';
import { useAppSelector } from '../../../app/hooks';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import { RootState } from "../../../app/store";
import { FormProps } from "./FormProps";

export function ErrorModal({ onClose, open, title }: FormProps) {
  const serverErrorMessages = useAppSelector((state: RootState) => state.monitor.serverErrorMessages);

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog 
      maxWidth={"sm"}
    onClose={handleClose} open={open}>
      <DialogTitle color={"error"}>
        { title !=='' ? title : 'There was an error' }
      </DialogTitle>
      <DialogContent>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Grid container spacing={2} maxWidth={"sm"}>
            <Grid item xs={12} sm={12}>
              {serverErrorMessages.length > 0 && serverErrorMessages.map(
                (msg, i) => <Grid m={1}><Alert severity="error" key={i} variant="outlined">
                  <Typography color="error" variant="body2">
                    {msg}
                  </Typography>
                </Alert>
                </Grid>
              )}  
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>Close</Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
