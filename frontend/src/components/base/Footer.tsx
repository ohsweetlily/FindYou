import { colors } from "@/styles/colors";
import styled from "@emotion/styled";

export const Footer = () => {
  return (
    <StyledFooter>
      <p>ⓒ 2023 찾아줄게!</p>
      <p>엘리스AI트랙 6기 2차 프로젝트 - 6팀(육개장칼국수)</p>
    </StyledFooter>
  );
};

const StyledFooter = styled.div`
  background-color: ${colors.gray7};
  text-align: center;
  padding: 36px 0px;

  p:first-of-type {
    color: ${colors.gray3};
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    margin-bottom: 8px;
  }
  p:last-of-type {
    color: ${colors.gray4};
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
  }
`;
