import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import Box from '@mui/material/Box/Box';
import { addUrl } from '../state/monitorSlice';
import { useAppDispatch } from '../../../app/hooks';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { ControllerWrapper } from "./ControllerWrapper";

interface FormProps {
  title: string;
  open: boolean;
  onClose: () => void;
}

const schema = yup.object({
  url: yup.string().required(),
  label: yup.string().required(),
  frequency: yup.number(),
});

export function MonitorForm({ onClose, open, title }: FormProps) {
  const dispatch = useAppDispatch();

  const {
    control, handleSubmit, reset,
    // register, 
    // watch, 
    formState: { errors, isValid }
  } = useForm({
    defaultValues: { url: '', label: '', frequency: 0 },
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: FieldValues
    // event: React.FormEvent<HTMLFormElement>
  ) => {
    if (!isValid)
      return;
    // event.preventDefault();
    const { url, label, frequency } = data;
    dispatch(addUrl({ url, label, frequency }));
    handleClose();
    // clear the form
    reset({ url: '', label: '', frequency: 0 });
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2} maxWidth={"sm"}>
            <Grid item xs={12} sm={12}>
              <ControllerWrapper
                name="url"
                control={control}
                errors={errors} />
            </Grid>
            <Grid item xs={12} sm={10}>
              <ControllerWrapper
                name="label"
                control={control}
                errors={errors} />
            </Grid>
            <Grid item xs={4} sm={2}>
              <ControllerWrapper
                name="frequency"
                control={control}
                errors={errors} />
            </Grid>
          </Grid>
          <Button variant="contained" type="submit">Save</Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>Cancel</Button>
      </DialogActions>
    </Dialog>

  );
}
