import React, { useEffect } from "react";
import Ranking from "./Ranking";
import { colors } from "@/styles/colors";
import styled from "@emotion/styled";
import Image from "next/image";
import Banner from "../../../public/img/banner_lostandfound.svg";
import Link from "next/link";
import { Title } from "../base/TitlesInMain";
import useGetRank from "@/hooks/useGetRank";

const Container = styled.div`
  width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  gap: 24;
  align-items: flex-end;
`;

const BannerArea = styled.div`
  width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
`;

const RankBox = () => {
  const { data, isLoading, error } = useGetRank();

  if (isLoading) {
    return <></>;
  }

  if (error) {
    <div>reward를 기준 랭킹 데이터를 불러오는데 실패했습니다.</div>;
  }

  return (
    <>
      <Title>명예의 전당</Title>
      <Container>
        {data && (
          <>
            <Ranking
              backgroundColor={colors.white}
              height={240}
              name={data[1].name}
              rank={2}
              items={data[1].reward / 10}
              reward={data[1].reward}
              profile={data[1].imageUrl}
              fontColor={colors.gray2}
            />
            <Ranking
              backgroundColor={colors.primary1}
              height={264}
              name={data[0].name}
              rank={1}
              items={data[0].reward / 10}
              reward={data[0].reward}
              profile={data[0].imageUrl}
              fontColor={colors.gray1}
            />
            <Ranking
              backgroundColor={colors.white}
              height={240}
              name={data[2].name}
              rank={3}
              items={data[2].reward / 10}
              reward={data[2].reward}
              profile={data[2].imageUrl}
              fontColor={colors.gray2}
            />
          </>
        )}
      </Container>
      <BannerArea>
        <Link href="/register/found">
          <Image src={Banner} alt="분실물센터" priority />
        </Link>
      </BannerArea>
    </>
  );
};

export default RankBox;
