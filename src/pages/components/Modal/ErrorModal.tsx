import Box from '@mui/material/Box/Box';
import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import { SimpleModalProps } from "./SimpleModalProps";

export interface ErrorModalProps extends SimpleModalProps {
  errorMessages: string[];
}

export function ErrorModal({ onClose, open, title, errorMessages }: ErrorModalProps) {
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
              {errorMessages.length > 0 && errorMessages.map(
                (msg, i) => <Grid key={i+msg} m={1}><Alert severity="error" variant="outlined">
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
