import styled from "@emotion/styled";
import { MouseEventHandler, ReactNode } from "react";
import { ButtonTheme, colors, getColorsOf } from "@/styles/colors";

interface ResponsiveButtonProps {
  children: ReactNode;
  theme: ButtonTheme;
  size?: "sm" | "md";
  isInactive?: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const ResponsiveButton = ({
  children,
  theme,
  size,
  isInactive = false,
  onClick,
}: ResponsiveButtonProps) => {
  if (isInactive) {
    theme = "inactive-theme";
  }
  const { backgroundColor, color, borderColor } = getColorsOf(theme);
  size ??= "md";

  return (
    <StyledResponsiveButton
      disabled={isInactive}
      onClick={onClick}
      color={color}
      isInactive={isInactive}
      size={size}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
    >
      {children}
    </StyledResponsiveButton>
  );
};

interface StyledResponsiveButtonProps {
  color: string;
  backgroundColor: string;
  borderColor: string | null;
  size: "md" | "sm";
  isInactive: boolean;
}

const StyledResponsiveButton = styled.button<StyledResponsiveButtonProps>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  ${({ borderColor }) =>
    borderColor ? `border: 1px solid ${borderColor}` : `border: 0`};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: ${({ color }) => color};
  border-radius: 8px;
  &:hover {
    opacity: ${({ isInactive }) => (isInactive ? "" : "0.8")};
  }
  &:active {
    opacity: ${({ isInactive }) => (isInactive ? "" : "0.5")};
  }
  cursor: ${({ isInactive }) => (isInactive ? "not-allowed" : "pointer")};
  box-sizing: border-box;
  height: ${({ size }) => (size === "md" ? "56px" : "32px")};
  font-weight: 600;
  font-size: ${({ size }) => (size === "md" ? "16px" : "13px")};
  padding: ${({ size }) => (size === "md" ? "18px 24px" : "8px 12px")};
  user-select: none;
`;
