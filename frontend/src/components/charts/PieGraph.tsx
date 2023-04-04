import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { TotalData } from "@/models/graphModel";
import Skeleton from "./Skeleton";
import styled from "@emotion/styled";
import useGetGraph from "@/hooks/useGetGraph";
import { colors } from "@/styles/colors";

interface CustomizedLabelParams {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

const Container = styled.div`
  display: flex;
`;

const DescContainer = styled.div`
  margin-top: 100px;
`;

const Desc = styled.div`
  font-weight: 700;
  font-size: 20px;
  padding: 4px;
`;

const COLORS = ["#ff6384", "#36a2eb"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: CustomizedLabelParams): JSX.Element => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieGraph = () => {
  const { data, isLoading, error } = useGetGraph<TotalData[]>(4);
  if (isLoading || data === undefined) {
    return <Skeleton />;
  }

  return (
    <Container>
      <PieChart width={400} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data?.map((_: any, idx: number) => (
            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
      <DescContainer>
        <Desc>
          전체 분실물: {(data[0].value || 1) + (data[1].value || 0)} 개
        </Desc>
        <Desc>주인을 찾은 분실물: {data[1].value} 개</Desc>
        <Desc>
          전체 회수율:{" "}
          {(
            (100 * (data[1].value || 0)) /
            ((data[0].value || 1) + (data[1].value || 0))
          ).toFixed(0)}{" "}
          %
        </Desc>
      </DescContainer>
    </Container>
  );
};

export default PieGraph;
