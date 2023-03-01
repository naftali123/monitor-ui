import { useEffect, useMemo } from "react";
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box/Box';
import { Grid } from '@mui/material';
import ScrollSpy from "react-ui-scrollspy";
import ActivityCard from "./ActivityCard";
import { RootState } from "../../../app/store";
import { Url } from "../types/Url";

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
                <ActivityCard url={url} syncId={syncId}/>
              </Box>
              <hr/>
            </Grid>
          );
        })}
      </ScrollSpy>
    </div>
  );
}
