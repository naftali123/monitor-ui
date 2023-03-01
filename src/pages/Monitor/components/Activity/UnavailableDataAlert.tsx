import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert/Alert';

export function UnavailableDataAlert() {
  return (
    <Alert severity="error" variant="outlined">
      <Typography color="error" variant="body2">
        Unavailable Data
      </Typography>
    </Alert>
  );
}
