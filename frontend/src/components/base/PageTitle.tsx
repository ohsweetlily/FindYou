import { colors } from "@/styles/colors";
import styled from "@emotion/styled";

interface TitleProps {
  text: string;
}

export const PageTitle = ({ text }: TitleProps) => {
  return <Title>{text}</Title>;
};

const Title = styled.h1`
  color: ${colors.gray1};
  font-weight: 700;
  font-size: 40px;
  line-height: 48px;
  margin: 32px 0 48px 0;
  text-align: center;
`;
