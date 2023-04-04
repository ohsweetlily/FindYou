import { colors } from "@/styles/colors";
import styled from "@emotion/styled";

interface CategoryBadgeProps {
  text: string;
}

export const CategoryBadge = ({ text }: CategoryBadgeProps) => {
  return <StyledBadge>{text}</StyledBadge>;
};

const StyledBadge = styled.div`
  background-color: ${colors.primary1WithOpacity20};
  border: 1px solid ${colors.primary1};
  border-radius: 40px;
  width: 88px;
  padding: 11px;
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  text-align: center;
  color: ${colors.primary3};
`;
