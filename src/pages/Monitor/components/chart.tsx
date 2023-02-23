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
import { ActivityHistory } from '../types';

export type ActivityChartProps = {
  label: string;
  syncId?: string;
}

export function ActivityChart({ label, syncId }: ActivityChartProps){
  syncId = useMemo(()=> syncId ?? Math.random().toString(36).substring(2),[]);
  const {
    data,
    // isLoading,
    // isSuccess,
    // isError,
    // error
  } = useGetActivitiesQuery(label);
  if(!data) return null;
  // const { entities } = data;
  // const t = entities.map((a: ActivityHistory) => a);
  return ( 
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        width={500}
        height={200}
        data={ data }
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