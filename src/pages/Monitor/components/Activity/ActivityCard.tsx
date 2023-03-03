import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ErrorIcon from '@mui/icons-material/Error';
import ActivityData from './ActivityData';
import { ActivityChart } from './ActivityChart';
import { useEffect, useState } from 'react';
import { useGetActivitiesQuery } from '../../state/websocket';
import { MonitorMenu } from '../MonitorMenu';
import { Url } from '../../types/Url';
import { Chip, Grid } from '@mui/material';
import { separateCamelCaseAndUpFirstLetter } from '../../../components/utils';

interface ExpandMoreProps extends IconButtonProps { expand: boolean; }

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface MonitorCardProps {
  url: Url;
  syncId: string;
}

export default function ActivityCard(props: MonitorCardProps) {
  const { url, syncId } = props;
  const [ unavailable, setShowUnavailableDataAlert ] = useState(false);
  const [ inactive, setInactive ] = useState(false);
  const {
    data,
    // isLoading,
    // isSuccess,
    // isError,
    // error
  } = useGetActivitiesQuery(url.label);

  useEffect(() => {
    if(data?.every((activity) => !activity.active)){
      setInactive(true);
    }
    else {
      setInactive(false);
    }

    let dataStreamTimeout = setTimeout(() => {
      setShowUnavailableDataAlert(true);
    }, url.interval * 1000);
    return () => {
      setShowUnavailableDataAlert(false);
      clearTimeout(dataStreamTimeout);
    };
  }, [data, url.interval, setShowUnavailableDataAlert, setInactive]);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card
    >
      <CardHeader
        action={<MonitorMenu url={url}/>}
        title={
          <Grid container spacing={1}>
            <Grid item>
              <Typography variant="h6" component="h2">
                {separateCamelCaseAndUpFirstLetter(url.label)}
              </Typography>
            </Grid>
            <Grid item>
              { inactive && <Chip size="small" color="error" icon={<ErrorIcon/>} label="Inactive" />}
            </Grid>
            <Grid item>
              { unavailable && <Chip size="small" color="warning" icon={<ErrorIcon/>} label="Unavailable data" />}
            </Grid>
          </Grid>
        }
        subheader={url.url}
      />
      {!inactive && <CardContent>
        <ActivityChart
          data={data}
          syncId={`${syncId}-${url.tags.join()}`}
        />
      </CardContent>}
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <ActivityData 
            data={data ?? []}
            label={url.label}
            excludeFields={['label']}
          />
        </CardContent>
      </Collapse>
    </Card>
  );
}