import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import Skeleton from "./Skeleton";
import useGetGraph from "@/hooks/useGetGraph";
import { ByCategory, ByPlace } from "@/models/graphModel";
interface Props {
  graphNum: 2 | 3;
}

const BarGraph = ({ graphNum }: Props) => {
  const { data, isLoading, error } = useGetGraph<ByPlace[] | ByCategory[]>(
    graphNum
  );

  if (isLoading) {
    return <Skeleton />;
  }

  return (
    <BarChart
      width={700}
      height={300}
      data={data}
      margin={{
        top: 35,
        right: 30,
        left: 30,
        bottom: -25,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={graphNum == 2 ? "place" : "category"} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="lost" fill="#ff3684" />
      <Bar dataKey="getBack" fill="#36a2eb" />
    </BarChart>
  );
};

export default BarGraph;
