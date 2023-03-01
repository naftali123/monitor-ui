import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { FieldValues, useForm } from 'react-hook-form';
import Box from '@mui/material/Box/Box';
import { addUrl } from '../../state/monitorSlice';
import { useAppDispatch } from '../../../../app/hooks';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { MonitorUrlRequest } from "../../types/MonitorUrlRequest";
import { SimpleModalProps } from "../../../components/Modal/SimpleModalProps";
import TagsArray from "../../../components/Form/TagsInput";
import { TextFieldControllerWrapper } from "../../../components/Form/TextFieldControllerWrapper";

const schema: yup.Schema<MonitorUrlRequest> = yup.object({
  url: yup.string().required(),
  label: yup.string().required(),
  interval: yup.number().required(),
  threshold: yup.number().required(),
  tags: yup.array().of(yup.string().required())
});

export function MonitorForm({ onClose, open, title }: SimpleModalProps) {
  const dispatch = useAppDispatch();

  const {
    control, handleSubmit, reset,
    // register, 
    clearErrors,
    // watch, 
    formState: { errors, isValid }
  } = useForm({
    defaultValues: { url: '', label: '', interval: 10, threshold: 1500, tags: [] },
    resolver: yupResolver(schema)
  });

  const onSubmit = (data: FieldValues) => {
    if (!isValid) return;
    dispatch(addUrl({...data as MonitorUrlRequest}));
    handleClose();
  };

  const handleClose = () => {
    onClose();
    clearErrors();
    reset({ url: '', label: '', interval: 0 });
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2} maxWidth={"sm"}>
            <Grid item xs={12} sm={6}>
              <TextFieldControllerWrapper
                required
                name="url"
                control={control}
                errors={errors} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextFieldControllerWrapper
                required
                name="label"
                control={control}
                errors={errors} />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextFieldControllerWrapper
                required
                name="interval"
                control={control}
                errors={errors} />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextFieldControllerWrapper
                required
                name="threshold"
                control={control}
                errors={errors} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TagsArray
                name="tags"
                control={control}
                errors={errors}
              />
            </Grid>
          </Grid>
          <DialogActions>
              <Button variant="contained" type="submit">Save</Button>
              <Button onClick={handleClose} autoFocus>Cancel</Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}