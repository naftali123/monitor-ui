import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { getAllUrls } from './state/monitorSlice';
import { useAppDispatch } from '../../app/hooks';
import { Grid } from '@mui/material';
import CustomTheme from '../components/Theme';
import { RootState } from "../../app/store";
import { FormDialog } from "./components/FormDialog";
import { MonitorChart } from "./components/MonitorChart";
import { MonitorList } from "./components/MonitorList";
import { LoadingModal } from "./components/LoadingModal";
import { ErrorModal } from "./components/ErrorModal";

function Monitor() {
  const dispatch = useAppDispatch();
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
        sideBar={<MonitorList/>}
      >
        <Grid container spacing={2}>

          <Grid item xs={4} sm={4}>
            <FormDialog/>
          </Grid>

        </Grid>
        <MonitorChart />
        
        <ErrorModal 
          title={""} 
          open={errorModalOpen} 
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