import React, { useState } from "react";
import styled from "@emotion/styled";

import BarGraph from "./BarGraph";
import LineGraph from "./LineGraph";
import PieGraph from "./PieGraph";
import { colors } from "@/styles/colors";

const Container = styled.div`
  width: 760px;
  height: 400px;
  border: 1px solid ${colors.gray5};
  margin: auto;
`;

const TabList = styled.ul`
  display: flex;
  justify-content: space-around;
  list-style: none;
  padding: 0;
  margin: 0 auto;
`;

const Tab = styled.li<{ clicked: boolean }>`
  width: 25%;
  height: 40px;
  line-height: 40px;
  font-weight: 600;
  text-align: center;
  color: ${(props) => (props.clicked ? colors.gray1 : colors.gray3)};
  border: 1px solid ${colors.gray5};
  text-align: center;
  cursor: pointer;
  border-bottom: ${(props) => props.clicked && "none"};
  &:first-of-type {
    border-left: none;
  }
  &:last-of-type {
    border-right: none;
  }
`;

const ChartBox = () => {
  const chartList = [
    { title: "월별 분실/회수량", component: <LineGraph /> },
    { title: "장소별 분실량", component: <BarGraph graphNum={2} /> },
    { title: "카테고리별 분실량", component: <BarGraph graphNum={3} /> },
    { title: "전체 회수율", component: <PieGraph /> },
  ];
  const [currTab, setCurrTab] = useState<string>("월별 분실/회수량");

  const handleClickTab = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ): void => {
    setCurrTab(e.currentTarget.innerText);
  };

  return (
    <Container>
      <TabList>
        {chartList.map(({ title, component }, idx) => (
          <Tab onClick={handleClickTab} key={idx} clicked={currTab === title}>
            {title}
          </Tab>
        ))}
      </TabList>
      {chartList
        .filter(({ title, component }) => title === currTab)
        .map(({ title, component }) => component)}
    </Container>
  );
};

export default ChartBox;
