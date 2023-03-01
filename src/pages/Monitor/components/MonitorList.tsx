import { useSelector } from 'react-redux';
import { CircularProgress, Grid, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { Link } from "react-router-dom";
import { RootState } from "../../../app/store";
import { Url } from "../types/Url";
import { MonitorMenu } from './MonitorMenu';

export function MonitorList() {
  const status = useSelector((state: RootState) => state.monitor.status);
  const subscriptions: Url[] = useSelector((state: RootState) => state.monitor.subscriptions);
  const onPress = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    const target = window.document.getElementById(
      e.currentTarget.href.split("#")[1]
    );
    if (target) {
      var headerOffset = 80;
      var elementPosition = target.getBoundingClientRect().top;
      var offsetPosition = elementPosition - headerOffset;

      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <List style={{ paddingTop: 0, paddingBottom: 0 }}>
      {status === 'loading'
        ? <ListItem disablePadding><ListItemText><CircularProgress /></ListItemText></ListItem>
        : subscriptions.map((url: Url) => (
          <ListItem key={url.appId} disablePadding secondaryAction={ <MonitorMenu url={url}/> }>
            <ListItemText primary={
              <Grid 
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs>
                  <ListItemButton
                    onClick={(e) => onPress(e)}
                    component={Link}
                    to={`#${url.appId}`}
                  >
                    <div data-to-scrollspy-id={url.appId}>
                      { url.label }
                    </div>
                  </ListItemButton>
                </Grid>
              </Grid>  
            }/>
          </ListItem>
        ))}
    </List>
  );
}
