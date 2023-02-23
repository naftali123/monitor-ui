import { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useGetActivitiesQuery } from '../state/websocket';

type ActivityChartProps = {
  label: string;
  syncId?: string;
}

export function ActivityChart({ label, syncId }: ActivityChartProps) {
  syncId = useMemo(() => syncId ?? Math.random().toString(36).substring(2), []);
  const {
    data,
    // isLoading,
    // isSuccess,
    // isError,
    // error
  } = useGetActivitiesQuery(label);
  if (!data)
    return null;
  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        width={500}
        height={200}
        data={data.map((activity: any) => {
          return {
            date: new Date(activity.date).toLocaleTimeString(),
            responseTime: activity.responseTime,
            pv: activity.date,
            amt: activity.info
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
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="responseTime" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
}
