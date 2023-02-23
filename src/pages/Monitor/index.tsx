import { useEffect } from "react";
import { useSelector } from 'react-redux';
import { getAllUrls } from './state/monitorSlice';
import { useAppDispatch } from '../../app/hooks';
import { Grid } from '@mui/material';
import CustomTheme from '../components/Theme';
import { RootState } from "../../app/store";
import { FormDialog } from "./components/FormDialog";
import { MonitorChart } from "./components/MonitorChart";
import { MonitorList } from "./components/MonitorList";

function Monitor() {
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

          <Grid item xs={4} sm={4}>
            <FormDialog/>
          </Grid>

        </Grid>
        <MonitorChart />
      </CustomTheme>
  );
}

export default Monitor;