import { useSelector } from 'react-redux';
import { remove } from '../state/monitorSlice';
import { useAppDispatch } from '../../../app/hooks';
import { Button, CircularProgress, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { RootState } from "../../../app/store";
import { Url } from "../types";
import { Link } from "react-router-dom";

export function MonitorList() {
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

      {status === 'loading'
        ? <CircularProgress />
        : subscriptions.map((url: Url) => (
          <ListItem key={url.appId} disablePadding>
            <ListItemButton
              onClick={(e) => onPress(e)}
              component={Link}
              to={`#${url.appId}`}
            >
              <div data-to-scrollspy-id={url.appId}>
                <ListItemText
                  primary={url.label} />
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
