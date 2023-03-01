import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { getAllUrls } from './state/monitorSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Grid, Typography } from '@mui/material';
import CustomTheme from '../components/Theme';
import { RootState } from "../../app/store";
import { FormDialog } from "./components/FormDialog";
import { MonitorChart } from "./components/ActivitiesChart";
import { MonitorList } from "./components/MonitorList";
import SideBar from "../components/SideBar";
import { ErrorModal } from "../components/Modal/ErrorModal";
import { LoadingModal } from "../components/Modal/LoadingModal";

function Monitor() {
  const dispatch = useAppDispatch();
  const serverErrorMessages = useAppSelector((state: RootState) => state.monitor.serverErrorMessages);
  const status = useSelector((state: RootState) => state.monitor.status);
  const [ errorModalOpen, setErrorModalOpen ] = useState(false);
  const [ loadingModalOpen, setLoadingModalOpen ] = useState(false);

  useEffect(() => {
    document.title = "System health";
    if(status === 'idle')
      dispatch(getAllUrls());
    else if(status === 'failed'){
      setLoadingModalOpen(false);
      setErrorModalOpen(true);
    }
    else if(status === 'loading'){
      setLoadingModalOpen(false);
      setLoadingModalOpen(true);
    }
    else if(status === 'success'){
      setLoadingModalOpen(false);
    }
  }, [status, dispatch]);

  return (
      <CustomTheme  
        title="System health"
        sideBar={ 
          <SideBar items={[
            {
              label: "Monitor list",
              expanded: true,
              children: <MonitorList />
            }
          ]}            
          /> 
      }>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Typography variant="body1">
              Motorized services health based on response time
            </Typography>    
          </Grid>
          <Grid item xs={12} sm={12}>
            <FormDialog/>
          </Grid>

          <Grid item xs={12} sm={12}>
            <MonitorChart />
          </Grid>
        </Grid>

        <ErrorModal 
          title={""} 
          open={errorModalOpen} 
          errorMessages={serverErrorMessages}
          onClose={function (): void {
            setErrorModalOpen(false);
        }}/>
        
        <LoadingModal 
          title={""} 
          open={loadingModalOpen} 
          onClose={function (): void {
            setLoadingModalOpen(false);
        }}/>
      </CustomTheme>
  );
}

export default Monitor;