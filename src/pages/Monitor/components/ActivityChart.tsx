import Alert from '@mui/material/Alert/Alert';
import Typography from '@mui/material/Typography/Typography';
import { useEffect, useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useGetActivitiesQuery } from '../state/websocket';

type ActivityChartProps = {
  label: string;
  frequency: number;
  syncId?: string;
}

function UnavailableDataAlert() {
  return (
    <Alert severity="error" variant="outlined">
      <Typography color="error" variant="body2">
        Unavailable Data
      </Typography>
    </Alert>
  );
}

export function ActivityChart({ label, syncId, frequency }: ActivityChartProps) {
  syncId = useMemo(() => syncId ?? Math.random().toString(36).substring(2), [syncId]);
  const [ showUnavailableDataAlert, setShowUnavailableDataAlert ] = useState(false);
  const {
    data,
    // isLoading,
    // isSuccess,
    // isError,
    // error
  } = useGetActivitiesQuery(label);

  useEffect(() => {
    const dataStreamTimeout = setTimeout(() => {
      setShowUnavailableDataAlert(true);
    }, frequency * 1000);
    return () => {
      setShowUnavailableDataAlert(false);
      clearTimeout(dataStreamTimeout);
    };
  }, [data, frequency, setShowUnavailableDataAlert]);


  if (!data)
    return null;

  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          width={500}
          height={200}
          data={data.map((activity: any) => {
            return {
              date: new Date(activity.date).toLocaleTimeString(),
              time: activity.responseTime
            };
          })}
          syncId={syncId}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorUv" x1="1" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="green" stopOpacity={0.5} />
              <stop offset="100%" stopColor="red" stopOpacity={0.5} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip
            labelStyle={{ color: 'black' }}
            contentStyle={{ backgroundColor: 'white', color: 'black' }}
          />
          <Line strokeWidth={5} type="monotone" dataKey="time" stroke="url(#colorUv)" fill="#E8F5E9" />
        </LineChart>
      </ResponsiveContainer>
      { showUnavailableDataAlert && <UnavailableDataAlert />}
    </div>
  );
}
