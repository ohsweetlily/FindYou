import useGetGraph from "@/hooks/useGetGraph";
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { Monthly } from "@/models/graphModel";
import Skeleton from "./Skeleton";
import { colors } from "@/styles/colors";
const LineGraph = () => {
  const { data, isLoading, error } = useGetGraph<Monthly[]>(1);

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <LineChart
      width={750}
      height={300}
      data={data}
      margin={{
        top: 35,
        right: 30,
        left: 30,
        bottom: -10,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend verticalAlign="top" height={36} />
      <Line
        type="linear"
        dataKey="lost"
        stroke="#FF6384"
        fill="#FF6384"
        activeDot={{ r: 6 }}
      />
      <Line
        type="linear"
        dataKey="getBack"
        stroke="#36A2EB"
        activeDot={{ r: 6 }}
        fill="#36A2EB"
      />
    </LineChart>
  );
};

export default LineGraph;
