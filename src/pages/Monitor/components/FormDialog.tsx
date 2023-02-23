import { useState } from "react";
import Box from '@mui/material/Box/Box';
import { Button } from '@mui/material';
import { MonitorForm } from "./MonitorForm";

export function FormDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Box sx={{ mt: 3 }}>
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          size="small"
        >
          Add monitor url
        </Button>
        <MonitorForm
          title="Subscribe to a new url"
          open={open}
          onClose={handleClose} />
      </Box>
    </div>
  );
}
