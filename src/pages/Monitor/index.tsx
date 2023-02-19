// import React from 'react';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { 
  // useSelector, 
  // useDispatch 
} from 'react-redux';
import { FieldValues, useForm } from 'react-hook-form';
import Box from '@mui/material/Box/Box';
import { subscribe } from './state/monitorSlice';
import { useAppDispatch } from '../../app/hooks';
import { Grid, Typography } from '@mui/material';
import { ControllerWrapper } from './components';
import CustomTheme from '../components/Theme';


// This is the monitor page
// the page should include a form for subscribing to a new url monitor 
// using the state and its api and the action
// 
// in other area in the page the page should display a list of all the urls
// and a list of all the monitors that are currently active
// each url will displayed in a graph with the response time over time
// the graph will be updated every 5 seconds
// the graph will be a line graph with the x axis being the time and the y axis being the response time


const schema = yup.object({
  url: yup.string().required(),
  label: yup.string().required(),
  frequency: yup.number(),
});

function MonitorForm() {
  const { 
    control,
    handleSubmit, 
    // register, 
    // watch, 
    formState: { errors, isValid }
  } = useForm({
    defaultValues: { url: '', label: '', frequency: 0 },
    resolver: yupResolver(schema)
  });

  const dispatch = useAppDispatch();
  
  const onSubmit = (data: FieldValues
    // event: React.FormEvent<HTMLFormElement>
  ) => {
    if(!isValid) return;
    // event.preventDefault();
    const { url, label, frequency } = data;
    dispatch(subscribe({ url, label, frequency }));
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <Typography variant="h6" component="h2">
          Subscribe to a new url
        </Typography>
      </Grid>
        <Grid item xs={12} sm={12}>
          <ControllerWrapper 
            name="url"
            control={control} 
            errors={errors}
          />
        </Grid>
        <Grid item xs={12} sm={10}>
          <ControllerWrapper
            name="label"
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item xs={4} sm={2}>
          <ControllerWrapper
            name="frequency"
            control={control}
            errors={errors}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

function Monitor() {
  return (
      <CustomTheme>
        <h1>This is the monitor page</h1>
        {/*
          plus button: should open a modal with the form
          <PlusButton/>
        */}
        <MonitorForm />
        {/* <MonitorList /> */}
        { /* <MonitorGraph /> */}
      </CustomTheme>
  );
}

export default Monitor;