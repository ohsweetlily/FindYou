import { colors } from "@/styles/colors";
import styled from "@emotion/styled";
import Image from "next/image";

interface BannerProps {
  text: string;
  type: string;
}

export const PreSignup = ({ text, type }: BannerProps) => {
  return (
    <Banner>
      {type === "personal" && (
        <Image
          src="/img/signup_personal.svg"
          alt="개인회원"
          width="144"
          height="72"
          priority
        />
      )}
      {type === "company" && (
        <Image
          src="/img/signup_company.svg"
          alt="기업회원"
          width="144"
          height="72"
          priority
        />
      )}
      <Text>{text}</Text>
    </Banner>
  );
};

const Banner = styled.div`
  width: 588px;
  height: 360px;
  border: 2px solid ${colors.gray5};
  border-radius: 8px;
  text-align: center;
  padding: 118px;
  user-select: none;
  color: ${colors.gray2};
  filter: grayscale(1);

  :hover {
    border: 2px solid ${colors.primary1};
    background-color: ${colors.primary1WithOpacity20};
    color: ${colors.gray1};
    filter: grayscale(0);
  }
`;

const Text = styled.p`
  margin-top: 24px;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
`;
