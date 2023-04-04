import styled from "@emotion/styled";
import React from "react";
import { colors } from "@/styles/colors";
import defaultProfile from "../../../public/profile.svg";
import Image from "next/image";
import { IMAGE_URL } from "@/config/constants";

const Container = styled.div<{ height: number; backgroundColor: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 384px;
  height: ${(props) => `${props.height}px`};
  background-color: ${(props) => props.backgroundColor};
  border-radius: 8px;
  padding: 24px 0;
`;

const Rank = styled.h2<{ fontColor: string }>`
  font-size: 32px;
  color: ${(props) => props.fontColor};
  font-weight: 700;
`;

const Profile = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${colors.gray6};
`;

const UserName = styled.h3<{ fontColor: string }>`
  color: ${(props) => props.fontColor};
  font-size: 24px;
  font-weight: 700;
`;

const Description = styled.div<{ backgroundColor: string }>`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 230px;
  height: 40px;
  border-radius: 40px;
  background-color: ${(props) =>
    props.backgroundColor === colors.primary1 ? colors.white : colors.gray7};
`;

const Nim = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const Gray3 = styled.p`
  font-size: 14px;
  color: ${colors.gray3};
  font-weight: 500;
`;
const Gray2 = styled.span`
  font-size: 14px;
  color: ${colors.gray2};
  font-weight: 600;
`;

interface Props {
  backgroundColor: string;
  height: number;
  name: string | undefined;
  rank: number;
  items: number;
  reward: number;
  profile?: string;
  fontColor: string;
}

const Ranking = ({
  backgroundColor,
  height,
  name,
  rank,
  items,
  reward,
  profile,
  fontColor,
}: Props) => {
  return (
    <Container height={height} backgroundColor={backgroundColor}>
      <Rank fontColor={fontColor}>{rank}</Rank>
      <Profile>
        <Image
          src={`${IMAGE_URL}/${profile}` || defaultProfile}
          alt="profile"
          width={48}
          height={48}
          style={{
            borderRadius: "50%",
          }}
        />
      </Profile>
      <UserName fontColor={fontColor}>
        {name}
        <Nim> 님</Nim>
      </UserName>
      <Description backgroundColor={backgroundColor}>
        <Gray3>
          찾아준 물건 <Gray2>{items}개</Gray2>
        </Gray3>
        <Gray3>
          리워드 <Gray2>{reward}</Gray2>
        </Gray3>
      </Description>
    </Container>
  );
};

export default Ranking;
