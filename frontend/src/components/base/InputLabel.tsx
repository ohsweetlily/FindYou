import { colors } from "@/styles/colors";
import styled from "@emotion/styled";

interface InputLabelProps {
  label: string;
  htmlFor: string;
}

export const InputLabel = ({ label, htmlFor }: InputLabelProps) => {
  return <StyledLabel htmlFor={htmlFor}>{label}</StyledLabel>;
};

const StyledLabel = styled.label`
  font-size: 16px;
  font-weight: 600;
  display: inline-block;
  color: ${colors.gray3};
  margin-bottom: 8px;
`;
