import { useEffect, useMemo } from "react";
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box/Box';
import { Grid, Typography } from '@mui/material';
import { ActivityChart } from "./ActivityChart";
import { RootState } from "../../../app/store";
import { Url } from "../types";
import ScrollSpy from "react-ui-scrollspy";

export function MonitorChart() {
  const syncId = useMemo(() => Math.random().toString(36).substring(2), []);
  const subscriptions: Url[] = useSelector((state: RootState) => state.monitor.subscriptions);

  useEffect(() => {
    console.log('subscriptions', subscriptions);
  }, [subscriptions]);

  return (
    <div>
      <ScrollSpy>
        {subscriptions.map((url: Url) => {
          return (
            <Grid sx={{ mt: 3 }} key={url.appId} id={url.appId}>
              <Box>
                <Typography variant="h5">{url.label}</Typography>
                <Typography variant="subtitle1">{url.url}</Typography>
                <ActivityChart 
                  syncId={`${syncId}-${url.tags.join()}`} 
                  label={url.label} 
                  frequency={url.frequency}
                />
              </Box>
              <hr/>
            </Grid>
          );
        })}
      </ScrollSpy>
    </div>
  );
}
