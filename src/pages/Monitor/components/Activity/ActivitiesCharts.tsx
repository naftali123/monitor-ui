import { useEffect, useMemo } from "react";
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box/Box';
import { Grid } from '@mui/material';
import ScrollSpy from "react-ui-scrollspy";
import ActivityCard from "./ActivityCard";
import { RootState } from "../../../../app/store";
import { Url } from "../../types/Url";

export function ActivitiesCharts() {
  const syncId = useMemo(() => Math.random().toString(36).substring(2), []);
  const urls: Url[] = useSelector((state: RootState) => state.monitor.urls);

  // useEffect(() => {
  //   console.log('urls', urls);
  // }, [urls]);

  return (
    <div>
      <ScrollSpy>
        {urls.map((url: Url) => {
          return (
            <Grid sx={{ mt: 3 }} key={url.appId} id={url.appId}>
              <Box>
                <ActivityCard url={url} syncId={syncId}/>
              </Box>
            </Grid>
          );
        })}
      </ScrollSpy>
    </div>
  );
}
