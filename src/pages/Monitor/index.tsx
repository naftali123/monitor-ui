import { useEffect, useMemo, useRef, useState } from "react";
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useSelector } from 'react-redux';
import { FieldValues, useForm } from 'react-hook-form';
import Box from '@mui/material/Box/Box';
import { getActivityHistory, addUrl, remove, getAllUrls } from './state/monitorSlice';
import { useAppDispatch } from '../../app/hooks';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { ControllerWrapper } from './components';
import CustomTheme from '../components/Theme';
import { ActivityChart } from "./components/chart";
import { RootState } from "../../app/store";
import { ActivityHistory, Url } from "./types";
import { useGetActivitiesQuery } from "./state/websocket";
import { Link } from "react-router-dom";
import ScrollSpy from "react-ui-scrollspy";


// This is the monitor page
// the page should include a form for subscribing to a new url monitor 
// using the state and its api and the action
// 
// in other area in the page the page should display a list of all the urls
// and a list of all the monitors that are currently active
// each url will displayed in a graph with the response time over time
// the graph will be updated every 5 seconds
// the graph will be a line graph with the x axis being the time and the y axis being the response time


export interface FormProps {
  title: string;
  open: boolean;
  onClose: () => void;
}

const schema = yup.object({
  url: yup.string().required(),
  label: yup.string().required(),
  frequency: yup.number(),
});

function MonitorForm({ onClose, open, title }: FormProps) {
  const dispatch = useAppDispatch();
  
  const { 
    control,
    handleSubmit, 
    reset,
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
    if(!isValid) return;
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
      <DialogTitle>{ title }</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2} maxWidth={"sm"}>
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
        <Button variant="contained" type="submit">Save</Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>Cancel</Button>
      </DialogActions>
    </Dialog>

  );
}

function FormDialog() {
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
          onClose={handleClose}
        />
      </Box>
    </div>
  );
}

// function MonitorChart({ ref }: any) {
function MonitorChart() {
  const syncId = useMemo(()=> Math.random().toString(36).substring(2),[]);
  const subscriptions: Url[] = useSelector((state: RootState) => state.monitor.subscriptions);

  useEffect(() => {
    console.log('subscriptions', subscriptions);
  //   const interval = setInterval(() => {
  //     // console.log('This will run every second!');
  //     subscriptions.forEach((url: Url) => {
  //       dispatch(getActivityHistory(url.label));
  //     });
  //   }, 1000);
  //   return () => clearInterval(interval);
  }, [subscriptions]);

  return (
    <div
    // ref={ref}
    >
      <ScrollSpy>
      { subscriptions.map((url: Url) => {
        // const data = url.activityHistory.map((activity: ActivityHistory) => {
        //   return {
        //     date: new Date(activity.date).toLocaleTimeString(),
        //     responseTime: activity.responseTime,
        //     pv: activity.date,
        //     amt: activity.info
        //   }
        // });
        return (
          <Box sx={{ mt: 3 }} key={url.appId} id={url.appId}>
            <Typography variant="h5">{ url.label }</Typography>
            <ActivityChart syncId={syncId} label={url.label}/>
          </Box>
        )
        })
      }
      </ScrollSpy>
    </div>
  );
}

function MonitorList() {
  const status = useSelector((state: RootState) => state.monitor.status);
  const dispatch = useAppDispatch();
  const subscriptions: Url[] = useSelector((state: RootState) => state.monitor.subscriptions);
  const onPress = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const target = window.document.getElementById(
      e.currentTarget.href.split("#")[1]
    );
    if (target) {
      var headerOffset = 20;
      var elementPosition = target.getBoundingClientRect().top;
      var offsetPosition = elementPosition - headerOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <List>
      
      { status === 'loading' 
      ? <CircularProgress/> 
      : subscriptions.map((url: Url) => (
          <ListItem key={url.appId} disablePadding>
            <ListItemButton 
              onClick={(e) => onPress(e)}
              component={Link}
              to={`#${url.appId}`}
            >
              <div data-to-scrollspy-id={url.appId}>
                <ListItemText 
                  primary={url.label}
                />
                  <Button
                    onClick={() => dispatch(remove(url.url))} 
                    variant="outlined" 
                    size="small"
                  >Delete</Button>
              </div>
            </ListItemButton>
          </ListItem>
      ))}
    </List>
  );
}
function Monitor() {
  // const parentScrollContainerRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();
  const status = useSelector((state: RootState) => state.monitor.status);
  useEffect(() => {
    document.title = "System health";
    if(status === 'idle')
      dispatch(getAllUrls());
  }, [status, dispatch]);

  return (
      <CustomTheme  
        title="System health"
        sideBar={<MonitorList/>}
      >
        <Grid container spacing={2}>
          {/* <Grid item xs={8} sm={8}>
            <h1>System health</h1>
          </Grid> */}
          <Grid item xs={4} sm={4}>
            <FormDialog/>
          </Grid>

        </Grid>
        <MonitorChart 
        // ref={parentScrollContainerRef}
        />
      </CustomTheme>
  );
}

export default Monitor;