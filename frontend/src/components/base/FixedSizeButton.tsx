import styled from "@emotion/styled";
import { MouseEventHandler, ReactNode } from "react";
import { ButtonTheme, colors, getColorsOf } from "@/styles/colors";

interface FixedSizeButtonProps {
  children: ReactNode;
  theme: ButtonTheme;
  isInactive?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const FixedSizeButton = ({
  children,
  theme,
  isInactive = false,
  onClick,
}: FixedSizeButtonProps) => {
  if (isInactive) {
    theme = "inactive-theme";
  }
  const { backgroundColor, color, borderColor } = getColorsOf(theme);
  return (
    <StyledFixedSizeButton
      disabled={isInactive}
      onClick={onClick}
      isInactive={isInactive}
      color={color}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
    >
      {children}
    </StyledFixedSizeButton>
  );
};

interface StyledFixedSizeButtonProps {
  color: string;
  backgroundColor: string;
  borderColor: string | null;
  isInactive: boolean;
}

const StyledFixedSizeButton = styled.button<StyledFixedSizeButtonProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  ${({ borderColor }) =>
    borderColor ? `border: 1px solid ${borderColor}` : `border: 0`};
  color: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: ${({ isInactive }) => (isInactive ? "" : "0.8")};
  }
  &:active {
    opacity: ${({ isInactive }) => (isInactive ? "" : "0.5")};
  }
  cursor: ${({ isInactive }) => (isInactive ? "not-allowed" : "pointer")};
  /* &:hover {
    opacity: 0.8;
  }
  &:active {
    opacity: 0.5;
  } */
  box-sizing: border-box;
  border-radius: 8px;
  width: 384px;
  height: 56px;
  font-weight: 600;
  font-size: 16px;
  padding: 10px 18px;
  user-select: none;
`;
