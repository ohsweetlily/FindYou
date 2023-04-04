import { colors } from "@/styles/colors";
import styled from "@emotion/styled";
import { ReactNode } from "react";
import { ResponsiveButton } from "./ResponsiveButton";

interface CategoryBadgeProps {
  children: ReactNode;
}

export const FloatingBar = ({ children }: CategoryBadgeProps) => {
  return <StyledFloatingBar>{children}</StyledFloatingBar>;
};

const StyledFloatingBar = styled.div`
  width: 100%;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  background-color: ${colors.gray1WithOpacity20};

  div {
    color: ${colors.white};
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px auto;
  }
`;
