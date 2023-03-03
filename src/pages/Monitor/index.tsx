import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { getAllUrls } from './state/monitorSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Grid, Link, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CustomTheme from '../components/Theme';
import { RootState } from "../../app/store";
import { ActivitiesCharts } from "./components/Activity/ActivitiesCharts";
import { MonitorList } from "./components/MonitorList";
import SideBar from "../components/SideBar";
import { ErrorModal } from "../components/Modal/ErrorModal";
import { LoadingModal } from "../components/Modal/LoadingModal";
import { MonitorForm } from "./components/From/MonitorForm";

function Monitor() {
  const dispatch = useAppDispatch();
  const serverErrorMessages = useAppSelector((state: RootState) => state.monitor.serverErrorMessages);
  const status = useSelector((state: RootState) => state.monitor.status);
  const sumUrls: number = useSelector((state: RootState) => state.monitor.subscriptions.length);


  const [ openForm, setOpenForm ] = useState(false);
  const [ errorModalOpen, setErrorModalOpen ] = useState(false);
  const [ loadingModalOpen, setLoadingModalOpen ] = useState(false);

  const handleClickOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  useEffect(() => {
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
        title="Monitor"
        breadcrumbsItems={[{ label: "Monitor", to: "/monitor" }]}
        sideBar={ 
          <SideBar items={[
            {
              label: "Add monitor url",
              children: <ListItemButton
                onClick={handleClickOpenForm}
              >
                <ListItemIcon><AddIcon/></ListItemIcon>
                <ListItemText primary="Add monitor url" />
              </ListItemButton>
            },
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
            <ActivitiesCharts />
          </Grid>

          { sumUrls === 0 && <FirstTimeMessage handleClickOpenForm={handleClickOpenForm}/> }
          
          <MonitorForm
            title="Subscribe to a new url"
            open={openForm}
            onClose={handleCloseForm} 
          />


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

interface FirstTimeMessageProps {
  handleClickOpenForm: () => void;
}

function FirstTimeMessage(props: FirstTimeMessageProps) {
  const { handleClickOpenForm } = props;
  return <Grid item xs={12} sm={12}>
    <Grid container spacing={2} justifyContent="center">
      <Grid item>
        <Typography
          align="center"
        >
          Welcome to Monitor, the web monitoring tool,
          <br />
          to begin, <span>&#20;</span><Link href="#" onClick={handleClickOpenForm}>create your first monitor url</Link><span>&#20;</span> to monitor.
        </Typography>
      </Grid>
    </Grid>
  </Grid>;
}
