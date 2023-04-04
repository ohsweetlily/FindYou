import { colors } from "@/styles/colors";
import styled from "@emotion/styled";
import { ReactNode } from "react";

interface CountTextProps {
  children: ReactNode;
}

export const CountText = ({ children }: CountTextProps) => {
  return <StyledBadge>{children}</StyledBadge>;
};

const StyledBadge = styled.div`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: ${colors.gray3};
`;
