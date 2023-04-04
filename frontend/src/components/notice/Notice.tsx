import { NoticeItemModel } from "@/models/noticeItemModel";
import { colors } from "@/styles/colors";
import styled from "@emotion/styled";
import Image from "next/image";
import { useRouter } from "next/router";
import ArrowImg from "../../../public/icon_arrow.svg";

interface NoticeProps {
  storeItems: number | undefined;
  pickupItems: number | undefined;
}

export const Notice = ({ storeItems, pickupItems }: NoticeProps) => {
  const router = useRouter();

  return (
    <NoticeContainer onClick={() => router.push("/found")}>
      <Text>
        이번 달 주인을 잃은 <span>{storeItems}개</span>의 분실물이 추위에 떨고
        있어요. <br />
        <span>{pickupItems}개</span>의 분실물이 주인을 찾았어요.
      </Text>
      <Image src={ArrowImg} alt="" width="24" height="24" priority />
    </NoticeContainer>
  );
};

const NoticeContainer = styled.div`
  width: 1200px;
  height: 180px;
  margin: 0 auto 64px auto;
  padding: 0 56px;
  background-color: ${colors.gray1};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  :hover {
    cursor: pointer;
    opacity: 0.9;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  }
`;

const Text = styled.p`
  font-weight: 400;
  font-size: 24px;
  line-height: 32px;
  color: ${colors.white};

  span {
    color: ${colors.primary1};
    font-weight: 600;
  }
`;
